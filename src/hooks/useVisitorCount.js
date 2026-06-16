import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useVisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // Count once per browser session
    if (!sessionStorage.getItem('visit_logged')) {
      sessionStorage.setItem('visit_logged', 'true');
      supabase.from('visitors').insert({}).then(() => {});
    }

    const fetchCount = async () => {
      const { count: c } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true });
      setCount(c ?? 0);
    };

    fetchCount();

    const channel = supabase
      .channel('visitor-count')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'visitors' }, () => {
        fetchCount();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return count;
}
