import React from "react";
import ContentEditable from "react-contenteditable";

import { getCaretCoordinates, setCaretToEnd } from "../../utils";
import TagSelectorMenu from "../TagSelectorMenu";
import styles from "./index.module.css";

const CMD_KEY = "/";

class EditableBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.openTagSelectorMenu = this.openTagSelectorMenu.bind(this);
    this.closeTagSelectorMenu = this.closeTagSelectorMenu.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
    this.addPlaceholder = this.addPlaceholder.bind(this);
    this.calculateTagSelectorMenuPosition =
      this.calculateTagSelectorMenuPosition.bind(this);
    this.contentEditable = React.createRef();
    this.state = {
      htmlBackup: null,
      html: "",
      tag: "p",
      imageUrl: "",
      placeholder: false,
      previousKey: null,
      isTyping: false,
      tagSelectorMenuOpen: false,
      tagSelectorMenuPosition: {
        x: null,
        y: null,
      },
      actionMenuOpen: false,
      actionMenuPosition: {
        x: null,
        y: null,
      },
    };
  }

  componentDidMount() {
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.props.html || this.props.imageUrl,
    });
    if (!hasPlaceholder) {
      this.setState({
        ...this.state,
        html: this.props.html,
        tag: this.props.tag,
        imageUrl: this.props.imageUrl,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const stoppedTyping = prevState.isTyping && !this.state.isTyping;
    const hasNoPlaceholder = !this.state.placeholder;
    const htmlChanged = this.props.html !== this.state.html;
    const tagChanged = this.props.tag !== this.state.tag;
    const imageChanged = this.props.imageUrl !== this.state.imageUrl;
    if (
      ((stoppedTyping && htmlChanged) || tagChanged || imageChanged) &&
      hasNoPlaceholder
    ) {
      this.props.updateBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
      });
    }
  }

  handleChange(e) {
    this.setState({ ...this.state, html: e.target.value });
  }

  handleFocus() {
    if (this.state.placeholder) {
      this.setState({
        ...this.state,
        html: "",
        placeholder: false,
        isTyping: true,
      });
    } else {
      this.setState({ ...this.state, isTyping: true });
    }
  }

  handleBlur(e) {
    const hasPlaceholder = this.addPlaceholder({
      block: this.contentEditable.current,
      position: this.props.position,
      content: this.state.html || this.state.imageUrl,
    });
    if (!hasPlaceholder) {
      this.setState({ ...this.state, isTyping: false });
    }
  }

  handleKeyDown(e) {
    if (e.key === CMD_KEY) {
      this.setState({ htmlBackup: this.state.html });
    } else if (e.key === "Backspace" && !this.state.html) {
      this.props.deleteBlock({ id: this.props.id });
    } else if (
      e.key === "Enter" &&
      this.state.previousKey !== "Shift" &&
      !this.state.tagSelectorMenuOpen
    ) {
      e.preventDefault();
      this.props.addBlock({
        id: this.props.id,
        html: this.state.html,
        tag: this.state.tag,
        imageUrl: this.state.imageUrl,
        ref: this.contentEditable.current,
      });
    }
    this.setState({ previousKey: e.key });
  }

  handleKeyUp(e) {
    if (e.key === CMD_KEY) {
      this.openTagSelectorMenu("KEY_CMD");
    }
  }

  openTagSelectorMenu(trigger) {
    const { x, y } = this.calculateTagSelectorMenuPosition(trigger);
    this.setState({
      ...this.state,
      tagSelectorMenuPosition: { x: x, y: y },
      tagSelectorMenuOpen: true,
    });
    document.addEventListener("click", this.closeTagSelectorMenu, false);
  }

  closeTagSelectorMenu() {
    this.setState({
      ...this.state,
      htmlBackup: null,
      tagSelectorMenuPosition: { x: null, y: null },
      tagSelectorMenuOpen: false,
    });
    document.removeEventListener("click", this.closeTagSelectorMenu, false);
  }

  handleTagSelection(tag) {
    if (this.state.isTyping) {
      this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
        setCaretToEnd(this.contentEditable.current);
        this.closeTagSelectorMenu();
      });
    } else {
      this.setState({ ...this.state, tag: tag }, () => {
        this.closeTagSelectorMenu();
      });
    }
  }

  addPlaceholder({ block, position, content }) {
    const isFirstBlockWithoutHtml = position === 1 && !content;
    const isFirstBlockWithoutSibling = !block.parentElement.nextElementSibling;
    if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
      this.setState({
        ...this.state,
        html: "Type a page title...",
        tag: "h1",
        placeholder: true,
        isTyping: false,
      });
      return true;
    } else {
      return false;
    }
  }

  calculateTagSelectorMenuPosition(initiator) {
    if (initiator === "KEY_CMD") {
      const { x: caretLeft, y: caretTop } = getCaretCoordinates(true);
      return { x: caretLeft, y: caretTop };
    }
    return { x: null, y: null };
  }

  render() {
    return (
      <>
        {this.state.tagSelectorMenuOpen && (
          <TagSelectorMenu
            position={this.state.tagSelectorMenuPosition}
            closeMenu={this.closeTagSelectorMenu}
            handleSelection={this.handleTagSelection}
          />
        )}

        <ContentEditable
          innerRef={this.contentEditable}
          data-position={this.props.position}
          data-tag={this.state.tag}
          html={this.state.html}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          tagName={this.state.tag}
          className={[
            styles.block,
            this.state.isTyping || this.state.tagSelectorMenuOpen
              ? styles.blockSelected
              : null,
            this.state.placeholder ? styles.placeholder : null,
          ].join(" ")}
        />
      </>
    );
  }
}

export default EditableBlock;
