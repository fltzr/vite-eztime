export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      family_surname: {
        Row: {
          created_at: string;
          id: string;
          surname: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          surname: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          surname?: string;
        };
        Relationships: [];
      };
      time_log: {
        Row: {
          amount_earned_euros_cents: number;
          created_at: string;
          date: string;
          end_time: string;
          family: string;
          hourly_rate_euros_cents: number;
          id: number;
          notes: string | null;
          start_time: string;
          user_id: string;
        };
        Insert: {
          amount_earned_euros_cents: number;
          created_at?: string;
          date?: string;
          end_time: string;
          family: string;
          hourly_rate_euros_cents?: number;
          id?: number;
          notes?: string | null;
          start_time: string;
          user_id?: string;
        };
        Update: {
          amount_earned_euros_cents?: number;
          created_at?: string;
          date?: string;
          end_time?: string;
          family?: string;
          hourly_rate_euros_cents?: number;
          id?: number;
          notes?: string | null;
          start_time?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'time_log_family_fkey';
            columns: ['family'];
            isOneToOne: false;
            referencedRelation: 'family_surname';
            referencedColumns: ['surname'];
          }
        ];
      };
      time_log_TEST: {
        Row: {
          amount_earned: number | null;
          created_at: string | null;
          date: string | null;
          end_time: string | null;
          family: string | null;
          hourly_rate_euros_cents: number | null;
          id: number;
          notes: string | null;
          start_time: string | null;
          user_id: string | null;
        };
        Insert: {
          amount_earned?: number | null;
          created_at?: string | null;
          date?: string | null;
          end_time?: string | null;
          family?: string | null;
          hourly_rate_euros_cents?: number | null;
          id: number;
          notes?: string | null;
          start_time?: string | null;
          user_id?: string | null;
        };
        Update: {
          amount_earned?: number | null;
          created_at?: string | null;
          date?: string | null;
          end_time?: string | null;
          family?: string | null;
          hourly_rate_euros_cents?: number | null;
          id?: number;
          notes?: string | null;
          start_time?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      calculate_amount_earned: {
        Args: {
          hourly_rate: number;
          start_time: string;
          end_time: string;
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
