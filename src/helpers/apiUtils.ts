const QUESTION_API_URL =
  "http://ec2-54-175-34-191.compute-1.amazonaws.com:8000/conversation_builder/question";
const ANSWER_API_URL =
  "http://ec2-54-175-34-191.compute-1.amazonaws.com:8000/conversation_builder/answer";
const CHAT_API_URL =
  "http://ec2-54-175-34-191.compute-1.amazonaws.com:8000/conversation_builder/chat";

const getAnswerData = (
  answersData: any,
  questionsId: number,
  questionType: number
) => {
  if (questionType === 1) {
    return null;
  }
  if (questionType === 2) {
    const answerData = answersData.filter((q: any) =>
      q.qids.includes(questionsId)
    )?.[0];
    return {
      id: answerData.id,
      range: answerData?.range ? { ...answerData.range } : null,
    };
  }
  if (questionType === 3) {
    const answerData = answersData.filter((q: any) =>
      q.qids.includes(questionsId)
    );
    return {
      id: answerData[0].id,
      options: answerData?.map((answer: any) => answer.text),
    };
  }
};

const getQuestionData = (
  questionsData: any,
  chatQuestionId: number,
  answerData: any
) => {
  const questionData = questionsData.filter(
    (q: any) => q.id === chatQuestionId
  )?.[0];
  return {
    id: questionData.id,
    type: questionData.type,
    text: questionData.text,
    answer: getAnswerData(answerData, chatQuestionId, questionData.type),
  };
};

const buildChatConfig = (
  questionData: any,
  answerData: any,
  chatData: any,
  chatId: string
) => {
  const chatConfig = {
    chatId,
    questions: chatData.questions.map((question: any) => {
      const questionId = question.qid;
      return {
        order: question.order,
        ...getQuestionData(questionData, questionId, answerData),
      };
    }),
  };
  console.log({ chatConfig });
  return chatConfig;
};

export const getChatConfig = async (chatId: string) => {
  try {
    const chatResponse = await fetch(`${CHAT_API_URL}/${chatId}`);
    const chatData = await chatResponse.json();
    const questionResponse = await fetch(`${QUESTION_API_URL}`);
    const questionData = await questionResponse.json();
    const answerResponse = await fetch(`${ANSWER_API_URL}`);
    const answerData = await answerResponse.json();
    return buildChatConfig(questionData, answerData, chatData, chatId);
  } catch (error) {
    console.log(error);
  }
};
