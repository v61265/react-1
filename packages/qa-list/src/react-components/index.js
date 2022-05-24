import React from "react";

import Section from "./layout/section";
import QAList from "./list/qa-list";

export default function QaList(props) {
  return (
    <Section>
      <QAList questions={props.questions} />
    </Section>
  );
}
