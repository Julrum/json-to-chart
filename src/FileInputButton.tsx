import { Button, styled } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { ChangeEventHandler, ReactNode } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileInputButton = ({
  children,
  onChange,
}: {
  children: ReactNode;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      {children}
      <VisuallyHiddenInput
        type="file"
        name="json"
        accept=".json"
        onChange={onChange}
      />
    </Button>
  );
};

export default FileInputButton;
