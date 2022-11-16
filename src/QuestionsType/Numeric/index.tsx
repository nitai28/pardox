import styled from "styled-components";

interface NumericProps {
  min: number;
  max: number;
}

const StyledFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Numeric = ({ min, max }: NumericProps) => {
  return (
    <StyledFlex>
      <span>{min}</span>
      <input disabled={true} step={1} type="range" min={min} max={max} />
      <span>{max}</span>
    </StyledFlex>
  );
};

export default Numeric;
