import certificationManifest from "../../../content/certifications/hackerrank-sql-basic/certification.json";
import domains from "../../../content/certifications/hackerrank-sql-basic/domains.json";
import questions from "../../../content/certifications/hackerrank-sql-basic/questions.json";
import { validateCertification } from "../validateCertification.js";

const certification = validateCertification({
  ...certificationManifest,
  domains,
  questions,
});

export default certification;
