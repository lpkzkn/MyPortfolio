export interface Company {
  name: string
  period: string
  role: string
  details: string[]
}

export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
}

export interface ResumeData {
  companies: Company[]
  projects: Project[]
  introduction: string
}
