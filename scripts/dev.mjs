import { spawn } from 'node:child_process'

const isWin = process.platform === 'win32'
const npmCmd = isWin ? 'npm.cmd' : 'npm'

function startService(name, args) {
  const child = spawn(npmCmd, args, {
    stdio: 'inherit',
    shell: isWin,
  })
  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`)
    }
  })
  return child
}

const be = startService('BE', ['--prefix', 'backend', 'run', 'dev'])
const fe = startService('FE', ['--prefix', 'frontend', 'run', 'dev'])

function shutdown() {
  be.kill()
  fe.kill()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
