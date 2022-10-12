import React from "react";
import fileSizeFromBytes from "../util/fileSizeFromBytes";
import numeral from "numeral";
import { TextInput } from "@agility/plenum-ui";
import { MetaRow } from "./MetaRow";

const Metadata = ({
  attachment,
  fieldConfig,
  handleAltTextChange,
  isImage,
}) => {
  return (
    <div className='grow mx-6 font-muli'>
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
