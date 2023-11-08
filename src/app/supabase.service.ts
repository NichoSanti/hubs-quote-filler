// src/app/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library to generate IDs
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;
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
