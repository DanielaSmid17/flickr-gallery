import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';
import ImageModal from './ImageModal'

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      imageRotation: 0,
      buttonsRotation: 0,
      borderColor: '#FFFFFF'
    };
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  handleExpandClick = () => {
    this.setState({ openModal: true })
  }

  handleModalClose = () => {
    this.setState({ openModal: false })
  }

  handleRequestModalClose = () => {
    this.setState({ openModal: false })
  }

  handleFlipButton = () => {
    this.setState({ imageRotation: (this.state.imageRotation + 90) % 360 })
    this.setState({ buttonsRotation: (this.state.buttonsRotation - 90) % 360 })
  }

  handleDragStart = (e) => {
    const initialPosition = Number(e.currentTarget.dataset.position)
    this.props.onGalleryDrag(initialPosition)
    this.setState({ borderColor: "#F7F700" })
  }

  handleDragEnter = (e) => {
    const currentPosition = Number(e.currentTarget.dataset.position)
    this.props.onGalleryDragEnter(currentPosition)
    console.log('after', this.state.imageClassName);
  }

  handleDrop = (e) => {
    this.props.onDrop()
    this.setState({ borderColor: "#FFFFFF" })
  }


  render() {
    return (
      <div
        data-position={this.props.index}
        draggable="true"
        onDragStart={this.handleDragStart}
        onDragEnter={this.handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        className={this.props.disableHover ? 'image-dragged' : 'image-root'}
        onDrop={this.handleDrop}
        style={{
          transform: `rotate(${this.state.imageRotation}deg)`,
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.props.size + 'px',
          height: this.props.size + 'px',
          justifyItems: 'center',
          border: `1px solid ${this.state.borderColor}`
        }}
      >
        <div style={{ transform: `rotate(${this.state.buttonsRotation}deg)` }}>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.handleFlipButton} />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={() => this.props.onDelete(this.props.dto)} />
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={this.handleExpandClick} />
        </div>
        <ImageModal isOpen={this.state.openModal} onClose={this.handleModalClose} onRequestClose={this.handleRequestModalClose} imgUrl={this.urlFromDto(this.props.dto)} title={this.props.dto.title} />
      </div >
    );
  }
}

export default Image;