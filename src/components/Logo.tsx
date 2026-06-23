export default function Logo({ className = "w-5 h-5 sm:w-6 sm:h-6" }: { className?: string }) {
  return (
    <img
      src="/assets/Photos/fitcheck-logo.svg"
      alt="Fitcheck"
      className={className}
    />
  );
}
