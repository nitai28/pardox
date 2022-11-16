interface MultichoiceProps {
  options: string[];
  groupName: string;
}

const Multichoice = ({ options, groupName }: MultichoiceProps) => {
  return (
    <fieldset>
      <legend>Choose your answers</legend>
      {options.map((option, index) => (
        <div key={option}>
          <input
            disabled={true}
            type="checkbox"
            id={option}
            name={groupName}
            value={option}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </fieldset>
  );
};
export default Multichoice;
