import careerData from '~/data/careerData.json'

export type CareerItem = {
  id: string
  category: string
  role: string
  period: string
  techStack: string[]
}

export const careerItems: CareerItem[] = careerData.engineer_profile.career_history
  .map((item, index) => ({
    id: `career-${index}`,
    category: item.category,
    role: item.role,
    period: item.period,
    techStack: item.tech_stack,
  }))
  .reverse()
