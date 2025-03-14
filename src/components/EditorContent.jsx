import React, { memo } from "react";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  Separator,
  BlockTypeSelect,
  CodeToggle,
  ListsToggle,
  linkDialogPlugin,
  linkPlugin,
  CreateLink,
  tablePlugin,
  InsertTable,
  imagePlugin,
  InsertImage,
  InsertThematicBreak,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";

function EditorContent({ ref, recipeContent }) {
  return (
    <MDXEditor
      ref={ref}
      className="mdxEditor"
      markdown={recipeContent}
      plugins={[
        linkPlugin(),
        imagePlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarClassName: "my-classname",
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <ListsToggle />
              <Separator />
              <BlockTypeSelect />
              <Separator />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
              <InsertThematicBreak />
            </>
          ),
        }),
      ]}
    />
  );
}

export default memo(EditorContent); // Using memo to not cause re-render on every state change
