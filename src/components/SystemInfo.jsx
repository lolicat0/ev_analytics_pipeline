const SystemInfo = () => {
  return (
    <div className="mt-6 text-center fade-in" style={{ animationDelay: '0.3s' }}>
      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        Powered by <span className="font-semibold text-primary-color">AWS</span>
      </p>
      <div className="flex items-center justify-center gap-2 mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        <span style={{ padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>S3</span>
        <span>+</span>
        <span style={{ padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>Lambda</span>
        <span>+</span>
        <span style={{ padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>API Gateway</span>
      </div>
    </div>
  );
};

export default SystemInfo;
