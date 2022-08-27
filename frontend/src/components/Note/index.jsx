import { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { usePrevious } from "../../hooks";
import { setCaretToEnd } from "../../utils";
import EditableBlock from "../EditableBlock";
import styles from "./index.module.css";

const Note = ({ blocks, setBlocks }) => {
  const [currentBlockId, setCurrentBlockId] = useState(null);
  const prevBlocks = usePrevious(blocks);

  useEffect(() => {
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      const nextBlockPosition =
        blocks.map((b) => b.id).indexOf(currentBlockId) + 1 + 1;
      const nextBlock = document.querySelector(
        `[data-position="${nextBlockPosition}"]`
      );
      if (nextBlock) {
        nextBlock.focus();
      }
    }
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks
        .map((b) => b.id)
        .indexOf(currentBlockId);
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`
      );
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
  }, [blocks, prevBlocks, currentBlockId]);

  const updateBlockHandler = (currentBlock) => {
    setBlocks(
      blocks.map((block) =>
        block.id === currentBlock.id ? currentBlock : block
      )
    );
  };

  const addBlockHandler = (currentBlock) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    const newBlock = { id: uuidv4(), tag: "p", html: "", imageUrl: "" };
    updatedBlocks.splice(index + 1, 0, newBlock);
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (currentBlock) => {
    if (blocks.length > 1) {
      setCurrentBlockId(currentBlock.id);

      setBlocks(blocks.filter((block) => block.id !== currentBlock.id));
    }
  };

  return (
    <div className={styles.wrapper}>
      {blocks.map((block) => {
        const position = blocks.map((b) => b.id).indexOf(block.id) + 1;
        return (
          <EditableBlock
            key={block.id}
            position={position}
            id={block.id}
            tag={block.tag}
            html={block.html}
            imageUrl={block.imageUrl}
            addBlock={addBlockHandler}
            deleteBlock={deleteBlockHandler}
            updateBlock={updateBlockHandler}
          />
        );
      })}
      <div className={styles.button}>
        <FaSave />
      </div>
    </div>
  );
};

export default Note;
