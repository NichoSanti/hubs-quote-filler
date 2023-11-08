// src/app/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library to generate IDs
import { dotenv }

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://bpwvzgvqhbrbybscoaff.supabase.co';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwd3Z6Z3ZxaGJyYnlic2NvYWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzMTk3MzQsImV4cCI6MjAxNDg5NTczNH0.CCkCN68m7vp_JuRTyUkhFJDd_7rf7nJFmW1q7E0pq_A';
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  constructor() {}

  async uploadData(tableName: string, data: any[]): Promise<any> {
    const uploadSessionId = uuidv4(); // Generate a new UUID for this upload session
    const dataWithSessionId = data.map((item) => ({
      ...item,
      upload_session_id: uploadSessionId, // Change this line to match the column name
    }));

    const { data: insertedData, error } = await this.supabase
      .from(tableName)
      .insert(dataWithSessionId);

    if (error) {
      throw error;
    }

    return insertedData;
  }
}
