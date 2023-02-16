// 模拟两个I/O操作
let syncMethods = () =>  ([
  new Promise((res, rej) => {
    setTimeout(() => {
      res({
        code: 200,
        data: 'success'
      })
    }, 500)
  }),
  new Promise((res, rej) => {
    setTimeout(() => {
      rej({
        code: 500,
        data: 'fail'
      })
    }, 500)
  })
])

// 用promise.all来处理
async function allHandleRes() {
  console.time()
  try{
    let [res1, res2] = await Promise.all(syncMethods())
  } catch(e) {
    console.timeEnd()
  }
}

allHandleRes() // default: 513.591ms

// 用promise.all来处理
async function allSettledHandleRes() {
  console.time()
  let [res1, res2] = await Promise.allSettled(syncMethods())
  console.timeEnd()
}

allSettledHandleRes() // default: 511.891ms


/**
 * Promise.allSettled 对比 Promise.all 的好处在于,
 * 可以获得每一个异步请求的结果, 然后对数据进行操作, 不会因为某一个异步请求失败而影响这个业务流程
 */