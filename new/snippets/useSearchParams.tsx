import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import Section, { SectionDataProps } from "components/Section";

const WoodkraftDetailsSection: React.FC<{}> = () => {
  // const queryString = useLocation()?.search;
  // const params = new URLSearchParams(queryString);
  // const startDate = params?.get('workStartDate') as string;
  // const endDate = params?.get('workEndDate') as string;

  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("workStartDate") || "";
  const endDate = searchParams.get("workEndDate") || "";

  const sectionData: SectionDataProps[] = [
    {
      label: "Name",
      value: "Woodkraft",
      type: "STRING",
    },
    {
      label: "Start Date",
      value: startDate,
      type: "DATE",
    },
    {
      label: "End Date",
      value: endDate,
      type: "DATE",
    },
  ];
  return <Section title="Woodkraft Details" collapsible data={sectionData} />;
};

export default WoodkraftDetailsSection;
