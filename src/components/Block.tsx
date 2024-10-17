import type { Block } from '@/types/fields';

const Block = (props: Block) => {
  if (props.type === "header") {
    return (
      <h2
        key={props.id}
        dangerouslySetInnerHTML={{
          __html: props.data.text,
        }}
      />
    );
  }
  if (props.type === "paragraph") {
    return (
      <p
        key={props.id}
        dangerouslySetInnerHTML={{
          __html: props.data.text,
        }}
      />
    );
  }
}

export default Block;