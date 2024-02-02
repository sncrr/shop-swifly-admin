import {
  FormGroup,
  FormInput,
  FormLabel,
  FormSection,
} from "../../../../components/forms";

const Currency = () => {
  return (
    <div className="w-full">
      <FormSection>
        <FormGroup>
          <FormLabel>Default Currency</FormLabel>
          <FormInput name="default" />
        </FormGroup>

        <FormGroup>
          <FormLabel>Default Currency Symbol</FormLabel>
          <FormInput name="currencySymbol" />
        </FormGroup>
      </FormSection>
    </div>
  );
};

export default Currency;
