
type ChangeCharacterProps = {
    setSeeSelectCharacter: (value: boolean) => void;
}

function ChangeCharacter({setSeeSelectCharacter}: ChangeCharacterProps) {

    return (
          <div className='cursor-pointer w-full flex flex-col items-center justify-center rounded-lg border mt-2 ' onClick={() => setSeeSelectCharacter(true)}>Cambiar personaje</div>
  )
}

export default ChangeCharacter