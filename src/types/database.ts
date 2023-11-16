
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      highscore: {
        Row: {
          " score_id": number
          created_at: string
          score: number
          user_id: string
        }
        Insert: {
          " score_id": number
          created_at?: string
          score: number
          user_id: string
        }
        Update: {
          " score_id"?: number
          created_at?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "highscore_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      monsters: {
        Row: {
          created_at: string
          image: string
          level: number
          monster_id: number
          name: string
        }
        Insert: {
          created_at?: string
          image: string
          level: number
          monster_id?: number
          name: string
        }
        Update: {
          created_at?: string
          image?: string
          level?: number
          monster_id?: number
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          exp: number | null
          full_name: string | null
          game_state: Json | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          exp?: number | null
          full_name?: string | null
          game_state?: Json | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          exp?: number | null
          full_name?: string | null
          game_state?: Json | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      quiz_class: {
        Row: {
          another: string | null
          class: string | null
          created_at: string
          episodes: number | null
          expl: string | null
          problem: string | null
          quiz_cid: number
          read: string | null
          write: string | null
        }
        Insert: {
          another?: string | null
          class?: string | null
          created_at?: string
          episodes?: number | null
          expl?: string | null
          problem?: string | null
          quiz_cid?: number
          read?: string | null
          write?: string | null
        }
        Update: {
          another?: string | null
          class?: string | null
          created_at?: string
          episodes?: number | null
          expl?: string | null
          problem?: string | null
          quiz_cid?: number
          read?: string | null
          write?: string | null
        }
        Relationships: []
      }
      quiz_rank: {
        Row: {
          another: string | null
          created_at: string
          difficulty: boolean | null
          episodes: number | null
          expl: string | null
          problem: string | null
          quiz_id: number
          rank: string | null
          read: string | null
          write: string | null
        }
        Insert: {
          another?: string | null
          created_at?: string
          difficulty?: boolean | null
          episodes?: number | null
          expl?: string | null
          problem?: string | null
          quiz_id?: number
          rank?: string | null
          read?: string | null
          write?: string | null
        }
        Update: {
          another?: string | null
          created_at?: string
          difficulty?: boolean | null
          episodes?: number | null
          expl?: string | null
          problem?: string | null
          quiz_id?: number
          rank?: string | null
          read?: string | null
          write?: string | null
        }
        Relationships: []
      }
      story: {
        Row: {
          chapter: number
          created_at: string
          paragraph: string
          sentence: Json
          story_id: number
        }
        Insert: {
          chapter: number
          created_at?: string
          paragraph: string
          sentence: Json
          story_id?: number
        }
        Update: {
          chapter?: number
          created_at?: string
          paragraph?: string
          sentence?: Json
          story_id?: number
        }
        Relationships: []
      }
    }
    Views: {
      paragraph: {
        Row: {
          chapter: number | null
          paragraph: string | null
        }
        Relationships: []
      }
      quiz_class_epi: {
        Row: {
          class: string | null
          episodes: number | null
        }
        Relationships: []
      }
      quiz_rank_epi: {
        Row: {
          episodes: number | null
          rank: string | null
        }
        Relationships: []
      }
      sentence_only:{
        Row: {
          sentence: Json
        }
      }
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
