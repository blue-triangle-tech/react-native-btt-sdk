package com.bttsdk.testsemulator

import java.util.LinkedList

class MemoryHolder {

    private var memoryBank: LinkedList<MemoryBlock>? = null

    class MemoryBlock(val size: Int) {
        private val memory = ByteArray(size)
    }

    fun allocateMemory(bytes: Int) {
        if(memoryBank == null) {
            memoryBank = LinkedList()
        }
        memoryBank?.add(MemoryBlock(bytes))
    }

    fun clearMemory():Boolean {
        if(memoryBank.isNullOrEmpty()) return false
        memoryBank?.clear()
        memoryBank = null
        Runtime.getRuntime().gc()
        return true
    }
}
