import React from "react";
import { useLocation } from "react-router-dom";
import Section, { SectionDataProps } from "components/Section";

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const WoodkraftDetailsSection: React.FC = () => {
  const params = useQueryParams();
  const workStartDate = params.get("workStartDate") || "";
  const workEndDate = params.get("workEndDate") || "";

  const sectionData: SectionDataProps[] = [
    { label: "Name", value: "Woodkraft", type: "STRING" },
    { label: "Start Date", value: workStartDate, type: "DATE" },
    { label: "End Date", value: workEndDate, type: "DATE" },
  ];

  return <Section title="Woodkraft Details" collapsible data={sectionData} />;
};

export default WoodkraftDetailsSection;
