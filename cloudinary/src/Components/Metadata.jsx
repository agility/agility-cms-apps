import React from "react";
import fileSizeFromBytes from "../util/fileSizeFromBytes";
import { TextInput } from "@agility/plenum-ui";
import { MetaRow } from "./MetaRow";

const Metadata = ({
  attachment,
  fieldConfig,
  handleAltTextChange,
  isImage,
}) => {
  return (
    <div className='mx-6 w-full flex-1 font-muli'>
      {isImage && (
        <TextInput
          type='text'
          label='Alt Text'
          className='form-control agility-attachment-alt'
          defaultValue={attachment?.context?.custom?.alt}
          onChange={(val) => handleAltTextChange(val)}
          isReadonly={fieldConfig.readOnly}
        />
      )}
      <MetaRow
        label='Type'
        value={`${attachment.resource_type} - ${attachment.format}`}
      />
      <MetaRow label={"Size"} value={fileSizeFromBytes(attachment.bytes)} />
      {attachment.resource_type === "video" && (
        <>
          <MetaRow label={"Width"} value={attachment.width} />
          <MetaRow label={"Height"} value={attachment.height} />
        </>
      )}
      <MetaRow
        label={"URL"}
        className={"border-b-0 border-b-transparent"}
        value={
          <a
            className='block break-all text-purple-600 line-clamp-1 hover:underline'
            href={attachment.secure_url}
            target='_blank'
            rel='noreferrer'
          >
            {attachment.public_id}
          </a>
        }
      />
    </div>
  );
};

export default Metadata;
