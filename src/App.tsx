import React from "react";
import "./App.css";
import { getChatConfig } from "./helpers/apiUtils";
import styled from "styled-components";
import Numeric from "./QuestionsType/Numeric";
import Multichoice from "./QuestionsType/Multichoice";

const StyledContainer = styled.div`
  padding: 20px;
  margin: 20px auto;
  max-width: 700px;
`;

const StyledChatIdInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px auto;
  height: 30px;
  width: 300px;
`;

const StyledChatIdInput = styled.input`
  flex-grow: 0.7;
  box-sizing: border-box;
  height: 100%;
  padding: 5px;
`;

const StyledChatIdButton = styled.button`
  flex-grow: 0.3;
  height: 100%;
`;

const StyledQuestion = styled.div`
  padding: 10px;
  margin: 10px;
  background: #eeeeee;
  border-radius: 20px;
`;

const StyledQuestionOption = styled(StyledQuestion)`
  background: #f7f9fa;
  color: #000;
`;

const StyledChatContent = styled.div`
  border: 1px solid #ecdfdf;
  border-radius: 8px;
  padding: 20px;
`;

const App = () => {
  const chatIdInputRef = React.useRef<HTMLInputElement>(null);
  const [chatConfig, setChatConfig] = React.useState<any>();

  const updateChatConfig = async () => {
    const chatId = chatIdInputRef.current?.value;
    if (!chatId) return;
    const chatConfiguration = await getChatConfig(chatId);
    if (chatConfiguration) {
      setChatConfig(
        chatConfiguration.questions.sort((a: any, b: any) => a.order - b.order)
      );
      if (chatIdInputRef.current?.value) {
        chatIdInputRef.current.value = "";
      }
    }
  };

  const renderQuestionOption = (question: any) => {
    if (question.type === 2) {
      const { min, max } = question.answer.range;
      return <Numeric max={max} min={min} />;
    } else if (question.type === 3) {
      return (
        <Multichoice
          options={question.answer.options}
          groupName={question.id}
        />
      );
    }
    return <div />;
  };

  return (
    <div className="App">
      <StyledContainer>
        <h1>Pardox task</h1>
        <StyledChatIdInputContainer>
          <StyledChatIdInput
            ref={chatIdInputRef}
            placeholder={"Enter chat ID"}
          />
          <StyledChatIdButton onClick={updateChatConfig}>
            Load chat config
          </StyledChatIdButton>
        </StyledChatIdInputContainer>
        {chatConfig?.length > 0 && (
          <StyledChatContent>
            {chatConfig?.map((question: any) => {
              return (
                <div key={question.id}>
                  <StyledQuestion>{question.text}</StyledQuestion>
                  <StyledQuestionOption>
                    {renderQuestionOption(question)}
                  </StyledQuestionOption>
                </div>
              );
            })}
          </StyledChatContent>
        )}
      </StyledContainer>
    </div>
  );
};

export default App;
