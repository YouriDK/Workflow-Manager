import React from "react";
import { Input, Button } from "reactstrap";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      fileExtension: "",
      LiferayImgPath:
        Liferay.ThemeDisplay.getPathThemeImages() + "/lexicon/icons.svg"
    };
  }

  handleUpload(evt) {
    if (evt.target.files[0]) {
      var file = evt.target.files[0];
      this.setState({ fileName: file.name, uploaded: true });
      let array = file.name.split(".");
      let extension = array[array.length - 1];
      switch (extension) {
        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
          extension = "docx";
          break;
        case "msword":
          extension = "doc";
          break;
        case "vnd.openxmlformats-officedocument.presentationml.presentation":
          extension = "pptx";
          break;
        case "vnd.ms-powerpoint":
          extension = "ppt";
          break;
        case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          extension = "xlsx";
          break;
        case "vnd.ms-excel":
          extension = "xls";
          break;
      }
      this.setState({ fileExtension: extension });
      this.fileToBase64(file).then(data => {
        var res = data.replace("octet-stream", this.state.fileExtension);
        this.props.callbackFile(res, extension);
      });
    } else {
      console.error("why cruel world??");
    }
  }

  resetfile() {
    this.props.callbackFile("");
    this.setState({ fileName: "" });
  }

  //TODO -> A BOUGER DANS LE AGIIRUTIL
  fileToBase64(file) {
    if (file != null) {
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
      <div className="agiir-component-fileupload">
        {!this.props.uploaded ? (
          <label className="agiir-component-fileupload-labelUpload agiir-component-fileupload-btnMargin agiir-btn-bleu btn btn-primary">
            <clay-icon spritemap={LiferayImgPath} symbol="upload"></clay-icon>{" "}
            &nbsp;&nbsp; Upload
            <Input
              type="file"
              accept="file/*"
              onChange={evt => this.handleUpload(evt)}
              name="fileUpload"
              id={"fileUpload" + this.props.fileId}
              hidden
            />
          </label>
        ) : (
          <Button
            className="agiir-component-fileupload-btnMargin"
            color="secondary"
            onClick={() => this.resetfile()}
          >
            <clay-icon spritemap={LiferayImgPath} symbol="trash"></clay-icon>{" "}
            &nbsp;&nbsp; Supprimer
          </Button>
        )}
        <span>{this.state.fileName}</span>
      </div>
    );
  }
}

export default FileUpload;
