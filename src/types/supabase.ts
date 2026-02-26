export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          subscription_tier: 'free' | 'paid'
          wa_connected: boolean
          onboarding_complete: boolean
          persona: string
          dashboard_ready: boolean
          parse_status: string | null
        }
        Insert: any
        Update: any
      }
      job_fit_scores: {
        Row: {
          job_id: string
          user_id: string
          fit_score: number
          fit_reasons: string | null
          created_at: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          role_family: string
          is_remote: boolean
        }
      }
      job_applications: {
        Row: {
          id: string
          job_id: string
          user_id: string
          status: string
          apply_tier: number
          applied_at: string
        }
      }
      skill_gap_results: {
        Row: {
          user_id: string
          top_gaps: Json
          updated_at: string
        }
      }
      career_intelligence: {
        Row: {
          user_id: string
          scores: Json
          updated_at: string
        }
      }
    }
  }
}
