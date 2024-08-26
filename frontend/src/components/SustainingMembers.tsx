import { useEffect, useState } from "react";
import "../assets/styles/components/SustainingMembers.scss";

const SustainingMembers = () => {
  const [sectionContent, setSectionContent] = useState("");

  useEffect(() => {
    const fetchSection = async () => {
      const response = await fetch(
        "http://localhost:62202/api/sustaining-members"
      );
      const data = await response.json();
      setSectionContent(data.content);
    };
    fetchSection();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: sectionContent }} />;
};

export default SustainingMembers;
