import { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { api } from '../../lib/axios';
import { usePolling } from '../../hooks/useRealtime';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

export function ResumeUpload({ onNext }: { onNext: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const { user, fetchUser } = useAuth();

  const pollParseStatus = async () => {
    if (!user?.id) return false;
    const { data } = await supabase
      .from('users')
      .select('parse_status')
      .eq('id', user.id)
      .single();

    const parsedData = data as any;

    if (parsedData?.parse_status === 'done') return true;
    if (parsedData?.parse_status === 'failed') {
      throw new Error('Parse failed');
    }
    return false;
  };

  const { error: pollError } = usePolling(
    pollParseStatus,
    () => {
      setIsPolling(false);
      fetchUser(user!.id).then(onNext);
    },
    'Analysis took too long. Please refresh.'
  );

  // Stop polling on poll error
  if (pollError && isPolling) {
    setIsPolling(false);
    setError(pollError);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setError(null);
    setFile(null);

    if (!selected) return;

    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selected.type)) {
      setError('Please upload a PDF or DOCX file.');
      return;
    }

    if (selected.size > 10485760) {
      setError('File size must be less than 10MB.');
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', user.id);

      await api.post('/api/agents/resume-intelligence', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploading(false);
      setIsPolling(true);
    } catch (err: any) {
      setError('Upload failed. Please try again.');
      setUploading(false);
    }
  };

  if (isPolling) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <h3 className="text-lg font-medium text-slate-900">Analysing your resume...</h3>
        <p className="text-slate-500 mt-2">Extracting skills, experience, and tailoring your AI persona.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Upload your resume</h2>
      <p className="text-slate-500 text-center mb-8">We'll use this to find the best jobs and tailor your applications.</p>

      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 relative">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />

        {file ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <p className="font-medium text-slate-900">{file.name}</p>
            <p className="text-sm text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <p className="font-medium text-slate-900">Click to upload or drag and drop</p>
            <p className="text-sm text-slate-500 mt-1">PDF or DOCX (max 10MB)</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center text-sm">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {uploading ? 'Uploading...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
