export interface CompanyProject {
  title: string
  period?: string
  details: string[]
}

export interface Company {
  name: string
  period: string
  role: string
  projects?: CompanyProject[]
  details?: string[]
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
}

export interface ResumeData {
  introduction: string
  skills: SkillCategory[]
  companies: Company[]
  projects: Project[]
  pr: string
}
