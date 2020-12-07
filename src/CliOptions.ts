import { TemplateConfig } from './TemplateConfig';


export interface CliOptions {
  projectName: string;
  templateName: string;
  templatePath: string;
  tartgetPath: string;
  config: TemplateConfig;
}
