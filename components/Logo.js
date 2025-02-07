export default function Logo({width, height}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_19_62)">
        <path
          d="M232.901 331.052C300.52 329.591 342.255 287.801 354.7 268.011C351.762 262.625 344.499 260.462 341.234 260.054C339.194 259.646 329.85 257.239 308.796 250.874C287.741 244.508 282.886 228.228 283.09 220.883C282.477 218.843 284.558 203.011 297.779 156.005C310.999 109 344.907 68.6861 360.208 54.4049C365.104 50.9366 377.958 44 390.199 44C402.44 44 401.828 67.258 399.991 78.887C394.891 98.2686 381.875 134.828 370.613 126.015C359.351 117.201 350.007 119.078 346.743 121.119C340.214 126.015 326.178 139.847 322.261 156.005C318.344 172.164 349.599 182.324 365.717 185.384C383.466 187.016 410.764 208.52 377.958 281.476C336.95 372.672 232.901 402.662 202.911 403.274C178.918 403.764 161.495 396.95 155.783 393.482C141.91 387.973 113.551 362.512 111.103 304.734C108.655 246.956 150.478 185.996 171.696 162.738H176.592V167.634C129.09 222.647 128.053 333.318 232.901 331.052Z"
          fill="#D9D9D9"
          stroke="#959595"
        />
        <path
          d="M137.386 468.264L152.375 420.3H197.231L182.243 468.264H137.386Z"
          fill="#D9D9D9"
          stroke="#959595"
        />
        <path
          d="M194.919 468.264L209.908 420.3H254.764L239.775 468.264H194.919Z"
          fill="#D9D9D9"
          stroke="#959595"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_19_62"
          x="103.4"
          y="43.4"
          width="315.2"
          height="449.464"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="5" dy="12" />
          <feGaussianBlur stdDeviation="6.05" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.643137 0 0 0 0 0.290196 0 0 0 0 1 0 0 0 0.7 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_19_62"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_19_62"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
