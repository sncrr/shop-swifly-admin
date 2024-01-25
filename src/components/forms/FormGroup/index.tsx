import { styled } from "styled-components";

interface Props {
  required?: boolean,
  children: any
}

export const FormGroup: React.FC<Props> = ({required, children}) => {

  if(children.length > 2) {
    return (
      <Container required={required}>
        {children[0]}
        <td>
          <table className="w-[30rem]">
            <tbody>
              <tr>
                {
                  children.map((item: any, index:any) => (
                    index > 0 && item
                  ))
                }
              </tr>
            </tbody>
          </table>
        </td>
      </Container>
    )
  }
  
  else {
    return (
      <Container required={required}>
        {children}
      </Container>
    )
  }
  
}

export const Container = styled.tr<{ required?: boolean; }>`

  .form-control-label {
    margin-top: 0.8rem;
  }

  .form-control-require {
    opacity: ${props => props.required ? '1' : '0' };
  }

  .form-control {
    width: 1rem;
  }



`