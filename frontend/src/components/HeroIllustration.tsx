const HeroIllustration = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="420"
        height="420"
        rx="210"
        className="fill-current text-primary opacity-20"
      />
      <rect
        x="50"
        y="50"
        width="320"
        height="320"
        rx="160"
        className="fill-current text-primary opacity-30"
      />
      <rect
        x="105"
        y="105"
        width="210"
        height="210"
        rx="105"
        className="fill-current text-primary"
      />
      <path
        d="M262.5 178.5C262.5 207.291 239.291 230.5 210.5 230.5C181.709 230.5 158.5 207.291 158.5 178.5C158.5 149.709 193.312 112 210.5 112C227.688 112 262.5 149.709 262.5 178.5Z"
        className="fill-current text-background"
      />
      <path
        d="M210.5 112C219.875 125.125 210.5 149.709 210.5 149.709"
        className="stroke-current text-accent"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeroIllustration;