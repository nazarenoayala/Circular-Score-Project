import { Button } from 'react-bootstrap';

export const MyButton = ({ text, onSubmit, btnClass }) => {
  return (
    <Button
      className={btnClass}
      onClick={onSubmit}
    >{text}
    </Button>
  )
}
