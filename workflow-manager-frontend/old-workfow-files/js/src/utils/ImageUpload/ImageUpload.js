import React from "react";
import { Input, Button } from "reactstrap";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageName: "",
      LiferayImgPath:
        Liferay.ThemeDisplay.getPathThemeImages() + "/lexicon/icons.svg"
    };
  }

  handleUpload(evt) {
    if (evt.target.files[0]) {
      var file = evt.target.files[0];
      this.setState({ imageName: file.name, uploaded: true });
      this.imageToBase64(file).then(data => {
        this.props.callbackFile(data);
      });
    } else {
      console.error("why cruel world??");
    }
  }

  resetImage() {
    this.props.callbackFile("");
    this.setState({ imageName: "" });
  }

  //TODO -> A BOUGER DANS LE AGIIRUTIL
  imageToBase64(file) {
    const validImagetypes = ["image/jpeg", "image/png", "image/tiff"];
    if (file != null && validImagetypes.includes(file.type)) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  }

  render() {
    const { LiferayImgPath } = this.state;
    return (
      <div className="agiir-component-imageupload">
        {!this.props.uploaded ? (
          <label className="agiir-component-imageupload-labelUpload agiir-component-imageupload-btnMargin btn btn-primary">
            <clay-icon spritemap={LiferayImgPath} symbol="upload"></clay-icon>{" "}
            &nbsp;&nbsp; Upload
            <Input
              type="file"
              accept="image/*"
              onChange={evt => this.handleUpload(evt)}
              name="imageUpload"
              id={"fileUpload" + this.props.imageId}
              hidden
            />
          </label>
        ) : (
          <Button
            className="agiir-component-imageupload-btnMargin"
            color="warning"
            onClick={() => this.resetImage()}
          >
            <clay-icon spritemap={LiferayImgPath} symbol="trash"></clay-icon>{" "}
            &nbsp;&nbsp; Supprimer
          </Button>
        )}
        <span>{this.state.imageName}</span>
        <br />
        <img
          className="agiir-component-imageupload-imgCanvas"
          src={this.props.src}
        />
      </div>
    );
  }
}

export default ImageUpload;
