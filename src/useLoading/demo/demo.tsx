import { useLoading } from '../index';
/**
 * 安装包之后替换成 
 * import { useLoading } from 'nicehook';
 */

function fetchData(keyword: string) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(keyword + ': data received')
    }, 2000)
  })
}

function Demo() {
  const [result, requestData] = useLoading<string>(fetchData);

  const handleClick = () => {
    requestData('1')
  }

  return <div>
    <button onClick={handleClick}>start fetch</button>
    <div>
      {
        result.loading ? 'loading' : result.data
      }
    </div>
  </div>
}

export {
  Demo
}