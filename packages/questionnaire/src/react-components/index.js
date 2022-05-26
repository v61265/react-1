import Question from "./question";
import QuestionCard from "./question-card";
import Result from "./result";
import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import difference from "lodash/difference";
import intersection from "lodash/intersection";
// import { RawDraftContentState } from 'draft-js'
import Landing from "./landing";
import DefaultLayout from "./layout/default-layout";
const _ = {
  cloneDeep,
  difference,
  intersection,
};

/**
 *  @param {Object} opts
 *  @param {import('./typedef').Form} opts.form
 *  @return {React.ReactElement}
 */
export default function Questionnaire({ form }) {
  if (!Array.isArray(form?.fields)) {
    return <h3>There is no question to answer</h3>;
  }

  const copyForm = createFormData(form);

  const emptyUserAnswers = createEmptyUserAnswers(copyForm.fields.length);

  const [userAnswers, setUserAnswers] = useState(emptyUserAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(copyForm.fields[0]);
  // The question has been answered
  if (userAnswers[currentQuestion.number]?.length > 0) {
    const matchedFormCondition = matchConditions(
      userAnswers,
      copyForm.conditions
    );
    if (matchedFormCondition) {
      const { answer, next, goOut } = matchedFormCondition;
      if (answer) {
        return (
          <Result
            resultData={copyForm.answers?.find((a) => a.id === answer.id)}
          />
        );
      }

      if (goOut) {
        // TODO: render GoOut component
        return <div>render goOut component</div>;
      }

      if (!next) {
        // The program should not enter this condition.
        // If it does, then the form data is created wrongly.
        return <div>Next question is not specified</div>;
      }

      // Go to next queustion
      setCurrentQuestion(copyForm.fields.find((q) => q.id === next.id));
    }
  }

  return (
    <DefaultLayout>
      {userAnswers[0].length === 0 && <Landing form={form} />}
      <QuestionCard isFristPage={userAnswers[0].length === 0}>
        <Question
          key={currentQuestion.id}
          {...currentQuestion}
          onAnswer={
            /**
             *  @param {string[]} a
             */
            (a) => {
              const newUserAnswers = [...userAnswers];
              newUserAnswers[currentQuestion.number] = a;
              setUserAnswers(newUserAnswers);
            }
          }
        />
      </QuestionCard>
    </DefaultLayout>
  );
}

/**
 *  The function compares the `condition` and `answer` objects.
 *  If `answer` matches `condition`, return true, otherwise, return false.
 *
 *  @param {string[]} answer
 *  @param {import('./typedef').Condition} condition
 *  @return {boolean}
 */
function matchCondition(answer, condition) {
  // no answer
  if (answer.length === 0) {
    return false;
  }

  switch (condition.compare) {
    case "not": {
      // Check if there is no any answer to match any option
      return (
        _.intersection(
          answer,
          condition?.option?.map((o) => o.value)
        ).length === 0
      );
    }
    case "include": {
      // Check if answers include all options
      return (
        answer.length >= condition?.option?.length &&
        _.intersection(
          answer,
          condition?.option?.map((o) => o.value)
        ).length === condition.option.length
      );
    }
    case "exclude": {
      // TODO: add compare logics
      return false;
    }
    case "is":
    default: {
      // Check if exactly match
      return (
        answer.length === condition?.option?.length &&
        _.difference(
          answer,
          condition?.option?.map((o) => o.value)
        ).length === 0
      );
    }
  }
}

/**
 *  For loop all form conditions,
 *  and check if user answers matches any of those form conditions.
 *  If matched, return the matched form condition.
 *  Otherwise, return `null`
 *  @param {string[][]} userAnswers
 *  @param {import('./typedef').FormCondition[]} formConditions
 *  @return {import('./typedef').FormCondition}
 */
function matchConditions(userAnswers, formConditions) {
  let matchedFormCondition = null;
  for (const fc of formConditions) {
    let matches = [];
    for (const c of fc.condition) {
      const questionNo = c.formField.number;
      matches.push(matchCondition(userAnswers[questionNo], c));
    }
    let matched = false;
    if (fc.type === "AND") {
      matched = matches.indexOf(false) === -1;
    } /* cs.type === 'OR'*/ else {
      matched = matches.indexOf(true) > -1;
    }

    if (matched) {
      matchedFormCondition = fc;
      break;
    }
  }

  return matchedFormCondition;
}

/**
 *  This function
 *  1. copies the form data object to avoid modifying the original one.
 *  2. sorts `questions` and `conditions` according to `sortOrder` and `order` properties.
 *  3. adds `number` property in `questions[]` and `conditons[].condition[].formField`
 *
 *  @param {import('./typedef').Form} form
 *  @return {import('./typedef').Form} new deep copy of form
 */
function createFormData(form) {
  const copyForm = _.cloneDeep(form);

  // sort question by sortOrder
  copyForm.fields.sort((a, b) => {
    return a.sortOrder - b.sortOrder;
  });

  // Raw question object has `id` and `sortOrder` properties.
  // `id` is auto incremented by database;
  // `sortOrder` is manually input by editors.
  //  We need to handle the corner cases like
  //  1. `sortOrder`s are identical
  //  2. questions' order is not equal to `id`s' order
  //  Therefore, we append the `number` property in each question.
  applyQuestionNumber(copyForm.fields);

  if (Array.isArray(copyForm?.conditions)) {
    // sort conditions by order
    copyForm.conditions.sort((a, b) => {
      return a.order - b.order;
    });

    applyQuestionNumberInConditions(copyForm.conditions, copyForm.fields);
  }

  return copyForm;
}

/**
 *  Since we have multiple choice question, we use array to store answers of a question.
 *  Therefore, empty user answers are a two dimension array.
 *
 *  @param {number} questionNumber
 *  @return {string[][]}
 */
function createEmptyUserAnswers(questionNumber) {
  const rtn = [];
  for (let i = 0; i < questionNumber; i++) {
    rtn.push([]);
  }
  return rtn;
}

/**
 *  The raw form question objects does not contain `number` property.
 *  This function adds `number` property in each question according to the question order.
 *
 *  @param {import('./typedef').Question[]} questions
 */
function applyQuestionNumber(questions) {
  // append question number
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    q.number = i;
  }
}

/**
 *  This function adds `number` property into `formConditions[].condition[].formField`.
 *
 *  @param {import('./typedef').FormCondition[]} formConditions
 *  @param {import('./typedef').Question[]} questions
 */
function applyQuestionNumberInConditions(formConditions, questions) {
  for (const fc of formConditions) {
    for (const c of fc.condition) {
      if (c.formField) {
        c.formField.number = questions.find(
          (q) => q.id === c.formField.id
        )?.number;
      }
    }
  }
}
