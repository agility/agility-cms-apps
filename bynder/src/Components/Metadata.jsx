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

  const orig = attachment && attachment.files ? attachment.files.original : null

  return (
    <div className='mx-6 w-full flex-1 font-muli bg-white min-w-[275px]'>
      {isImage && (
        <TextInput
          type='text'
          label='Alt Text'
          className='form-control agility-attachment-alt'
          value={attachment?.alt || attachment?.name || ""}
          onChange={(val) => handleAltTextChange(val)}
          isReadonly={fieldConfig.readOnly}
        />
      )}
      {/* <MetaRow
        label='Type'
        value={`${attachment.resource_type} - ${attachment.format}`}
      /> */}
      <MetaRow label={"Size"} value={fileSizeFromBytes(orig?.fileSize)} />

      <>
        {orig?.width > 0 &&
          <MetaRow label={"Width"} value={orig?.width} />
        }
        {orig?.height > 0 &&
          <MetaRow label={"Height"} value={orig?.height} />
        }
      </>

      <MetaRow
        label={"URL"}
        className={"border-b-0 border-b-transparent"}
        value={
          <a
            className='block break-all text-purple-600 line-clamp-1 hover:underline'
            href={attachment.originalUrl}
            target='_blank'
            rel='noreferrer'
          >
            {attachment?.name || "Asset URL"}
          </a>
        }
      />
    </div>
  );
};

export default Metadata;
