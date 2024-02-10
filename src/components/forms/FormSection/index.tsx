import { ReactNode, useEffect, useState } from 'react';
import styled from "styled-components";
import { colors } from '../../../theme';
import { ChevronCompactRight } from '../../../assets/svgs/Icons';


interface Props {
  id?: string,
  title?: string,
  isOpen?: boolean,
  children?: ReactNode,
  nontabular?: boolean,
  hasRequired?: boolean,
}

const Section = styled.div`

  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 2rem;

  .form-section-label {
    width: 100%;
    border-bottom: 1px solid ${colors.mainColor}55;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .form-section-toggle {
    display: none;
  }

  .form-section-content {
    padding: 1rem;
    display: none;
  }

  .form-section-arrow {
    transition: transform 300ms ease-in-out;
  }

  .form-section-arrow-open {
    transform: rotate(90deg) translateY(4px);
  }

  .form-section-toggle:checked + .form-section-content {
    display: block;
  }

`;

function Tabular({ children }: { children: ReactNode }) {
  return (
    <table className='table table-bordered w-full'>
      <colgroup>
        <col style={{ width: "30%" }} />
        <col style={{ width: "70%" }} />
      </colgroup>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

function NonTabular({ children }: { children: ReactNode }) {
  return (
    <div className='table table-bordered w-full'>
      {children}
    </div>
  )
}

export function FormSection(props: Props) {

  const [open, setOpen] = useState(props.isOpen ? props.isOpen : false);

  useEffect(() => {

    if (props.hasRequired) {
      const submitButtons = document.querySelectorAll('#submit');

      //Open section when form is submit but a required field inside it is blank
      const handleButtonClick = () => {
        setOpen(true);
      };

      submitButtons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
      });

      return () => {
        submitButtons.forEach(button => {
          button.removeEventListener('click', handleButtonClick);
        });
      };
    }
  }, []);



  return (
    <Section>
      {
        props.title && (
          <>
            <label
              className='form-section-label px-4 py-2'
              htmlFor={`form-section-${props.id}`}
            >
              <div className='font-semibold text-mainColor'>{props.title}</div>
              <div className={`form-section-arrow ${open ? 'form-section-arrow-open' : 'form-section-arrow'}`}>
                <ChevronCompactRight />
              </div>
            </label>
            <input
              className='form-section-toggle'
              type='checkbox'
              checked={open}
              onChange={(e) => {
                setOpen(e.target.checked)
              }}
              id={`form-section-${props.id}`}
            />
          </>
        )
      }

      <div className={props.title ? "form-section-content" : ""}>
        {
          props.nontabular ?
            <NonTabular children={props.children} />
            :
            <Tabular children={props.children} />
        }
      </div>
    </Section>
  )
}