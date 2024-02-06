// helper para converter nova linha para <br /> tags

export const convertNewLines = (text: string) => text.split('\n').map((line, i) => (
  <span key={i}>
    {line}
    <br />
  </span>
));