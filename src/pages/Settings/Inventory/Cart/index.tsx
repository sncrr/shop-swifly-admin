import {
  FormGroup,
  FormInput,
  FormLabel,
  FormSection,
} from "../../../../components/forms";

const Cart = () => {
  return (
    <div className="w-full">
      <FormSection>
        <FormGroup>
          <FormLabel>Cart Qty Limit</FormLabel>
          <FormInput
            name="cartQtyLimit"
            description="Set the maximum quantity for shopping cart"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Minimum Item Qty Allowed</FormLabel>
          <FormInput
            name="minItemQtyAllowed"
            description="Set the minimum quantity of an item in shopping cart. Can be override."
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Maximum Item Qty Allowed</FormLabel>
          <FormInput
            name="maxItemQtyAllowed"
            description="Set the maximum quantity of an item in shopping cart. Can be override."
          />
        </FormGroup>
      </FormSection>
    </div>
  );
};

export default Cart;
