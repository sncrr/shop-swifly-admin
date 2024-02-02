import {
  FormCheckBox,
  FormGroup,
  FormInput,
  FormLabel,
  FormSection,
} from "../../../../components/forms";

const Gcash = () => {
  return (
    <div className="w-full">
      <FormSection title="General" isOpen>
        <FormGroup>
          <FormLabel>Is Enable</FormLabel>
          <FormCheckBox
            name="isEnable"
            description="Set the availability of payment"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Minimum Available Amount</FormLabel>
          <FormInput
            name="minAmount"
            type="number"
            description="Set the minimum amount to use the payment method"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Maximum Available Amount</FormLabel>
          <FormInput
            name="maxAmount"
            type="number"
            description="Set the maximum amount to use the payment method"
          />
        </FormGroup>
      </FormSection>
      <FormSection id="urls" title="URLs">
        <FormGroup>
          <FormLabel>Payment URL</FormLabel>
          <FormCheckBox name="paymentUrl" />
        </FormGroup>
        <FormGroup>
          <FormLabel>Payment Success URL</FormLabel>
          <FormInput name="paymentSuccessUrl" />
        </FormGroup>
        <FormGroup>
          <FormLabel>Payment Failed URL</FormLabel>
          <FormInput name="paymentFailedUrl" />
        </FormGroup>
      </FormSection>
    </div>
  );
};

export default Gcash;
