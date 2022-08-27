import { useState, useEffect } from "react";
import { matchSorter } from "match-sorter";

import styles from "./index.module.css";

const MENU_HEIGHT = 150;
const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Page Title",
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading",
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Subheading",
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph",
  },
];

const TagSelectorMenu = ({ position, closeMenu, handleSelection }) => {
  const [tagList, setTagList] = useState(allowedTags);
  const [selectedTag, setSelectedTag] = useState(0);
  const [command, setCommand] = useState("");

  useEffect(() => {
    setTagList(matchSorter(allowedTags, command, { keys: ["tag"] }));
  }, [command]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSelection(tagList[selectedTag].tag);
      } else if (e.key === "Tab" || e.key === "ArrowDown") {
        e.preventDefault();
        const newSelectedTag =
          selectedTag === tagList.length - 1 ? 0 : selectedTag + 1;
        setSelectedTag(newSelectedTag);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const newSelectedTag =
          selectedTag === 0 ? tagList.length - 1 : selectedTag - 1;
        setSelectedTag(newSelectedTag);
      } else if (e.key === "Backspace") {
        if (command) {
          setCommand(command.slice(0, -1));
        } else {
          closeMenu();
        }
      } else {
        setCommand(command + e.key);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [tagList, selectedTag]);

  return (
    <div
      className={styles.menuWrapper}
      style={{
        top: position.y - 50,
        left: 0,
      }}
    >
      <div className={styles.menu}>
        {tagList.map((tag, key) => {
          return (
            <div
              key={key}
              data-tag={tag.tag}
              className={
                tagList.indexOf(tag) === selectedTag
                  ? [styles.item, styles.selectedTag].join(" ")
                  : styles.item
              }
              role="button"
              tabIndex="0"
              onClick={() => handleSelection(tag.tag)}
            >
              {tag.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelectorMenu;
