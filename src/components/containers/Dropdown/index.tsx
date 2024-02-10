import styled from "styled-components";
import { colors } from "../../../theme";

export const Dropdown = styled.button`

  position: relative;

  ul {
    position: absolute;
    z-index: 10;
    right: 0;
    display: none;
    background-color: ${colors.white};
    text-align: left;
    border-radius: 0.3rem;

    --tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);

    li {
      padding: 0.5rem 1rem;
      transition: background-color 150ms ease-in;
      border-bottom: 1px solid ${colors.gray10th};
    }

    li:last-child {
      border: none;
    }

    li:hover {
      background-color: ${colors.inputFocus};
    }
  }

  &:focus {
    ul {
      display: block;
    }
  }
`;