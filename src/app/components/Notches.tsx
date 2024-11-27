const NOTCH_COUNT = 8

const Notches = ({ isCenter }: { isCenter: boolean }) => {
  const notches = [-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className='py-[50px] grid grid-flow-row justify-items-end'>
      {notches.map((number) => {
        if (number % 2 == 0 && number !== 0) {
          return <span key={number}>{number} -</span>
        } else if (number === 0) {
          return (
            <img
              className='size-8'
              src={isCenter ? "/light-on.jpg" : "/light-off.jpg"}
            />
          )
        }
        return <span key={number}>-</span>
      })}
    </div>
  )
}

export default Notches
