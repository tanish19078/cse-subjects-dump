# OSLF MCQ Revision Guide

Source used: `cho.pdf` course handout plus local OSLF revision notes and lecture PPTs.

## 1. Exam Priority Map

Use this order when time is short. The percentage comes from the syllabus table in `cho.pdf`.

| Priority | Topic | Weightage | MCQ focus |
|---|---:|---:|---|
| 1 | Memory Management and Virtualisation | 13% | MMU, paging, segmentation, fragmentation, address translation |
| 2 | Virtual Memory | 13% | demand paging, page fault EAT, FIFO/LRU/OPT, thrashing |
| 3 | Process Synchronization | 10% | critical section, Peterson, hardware locks, semaphores |
| 4 | Deadlock | 10% | 4 conditions, prevention, avoidance, Banker, detection/recovery |
| 5 | CPU Scheduling: FCFS/SJF | 9% | Gantt charts, TAT/WT/RT, preemptive vs non-preemptive |
| 6 | Intro to OS | 6% | OS role, architecture, components |
| 7 | OS Structure | 6% | monolithic, layered, microkernel, kernel, shell, system calls |
| 8 | Linux OS Intro | 6% | Linux features, GNU/Linux, distributions, architecture |
| 9 | Process Management | 6% | process states, PCB, creation, termination, IPC |
| 10 | Threads | 6% | thread benefits, models, user/kernel threads, Linux threads |
| 11 | Priority/RR/MLQ Scheduling | 6% | priority starvation/aging, RR quantum, queue types |
| 12 | Mass Storage | 6% | disk structure, scheduling, seek time |
| 13 | File Management | 3% | file allocation, free-space management |

Quick strategy:

- First revise topics worth 10% or more.
- Then revise CPU scheduling because MCQs often include calculations.
- Finally revise Linux commands and file/storage topics because they are usually direct-memory questions.

## 2. Must-Know Formula Sheet

### CPU Scheduling

```text
Turnaround Time (TAT) = Completion Time - Arrival Time
Waiting Time (WT) = Turnaround Time - Burst Time
Response Time (RT) = First Response Time - Arrival Time
Throughput = Number of completed processes / Total time
```

Optimization goals:

- Maximize CPU utilization.
- Maximize throughput.
- Minimize turnaround time.
- Minimize waiting time.
- Minimize response time.

### Paging Address Translation

```text
Page number = Logical address / Page size
Offset = Logical address % Page size
Physical address = Frame number * Page size + Offset
```

### TLB Effective Access Time

```text
EAT = hit_ratio * (TLB_time + memory_time)
    + (1 - hit_ratio) * (TLB_time + 2 * memory_time)
```

If TLB lookup time is ignored:

```text
EAT = hit_ratio * memory_time + (1 - hit_ratio) * 2 * memory_time
```

### Page Fault Effective Access Time

```text
EAT = (1 - page_fault_rate) * memory_access_time
    + page_fault_rate * page_fault_service_time
```

Common trap: convert units before calculating. If service time is in ms and memory time is in ns, convert one of them.

### Banker's Algorithm

```text
Need = Max - Allocation
```

A state is safe if there is at least one sequence in which all processes can finish.

### Disk Scheduling

```text
Head movement = |current head - next request|
Total head movement = sum of all head movements
Average seek time = total head movement / number of requests
```

## 3. Introduction to Operating System

### Core Definition

An operating system is system software that acts as an intermediary between users/applications and computer hardware.

It manages:

- CPU/processes
- Memory
- Files
- I/O devices
- Storage
- Security and protection

### OS Goals

- Convenience: make the computer easy to use.
- Efficiency: use hardware resources properly.
- Resource management: allocate CPU, memory, devices, and files.
- Control program: prevent errors and improper use of the computer.

### Computer System Architecture

| Type | Meaning | MCQ clue |
|---|---|---|
| Single processor | One general-purpose CPU | simple system |
| Multiprocessor | Multiple CPUs share memory and clock | higher throughput, reliability |
| Clustered system | Multiple independent systems connected together | high availability |

### OS Operations

- Interrupt-driven: hardware and software interrupt the CPU.
- Dual-mode operation: user mode and kernel mode.
- Mode bit: identifies current mode.
- Timer: prevents infinite loops by user programs.

### OS Components

| Component | Role |
|---|---|
| Process management | create, schedule, terminate processes |
| Memory management | allocate/deallocate memory, manage paging/segmentation |
| File management | create/delete files and directories |
| I/O management | device drivers, buffering, caching, spooling |
| Storage management | disk scheduling, free-space management |
| Protection/security | control access to resources |

MCQ traps:

- Kernel is the core program running at all times.
- OS is not just a user interface; it manages hardware resources.
- Application programs are not part of the kernel.

## 4. OS Structure

### Kernel vs Shell

| Term | Meaning |
|---|---|
| Kernel | Core of OS; manages CPU, memory, devices, files |
| Shell | Interface between user and kernel; accepts commands |

### OS Services

Common OS services:

- Program execution
- I/O operations
- File-system manipulation
- Communication
- Error detection
- Resource allocation
- Accounting
- Protection and security

### System Calls

System calls provide an interface between a user program and the OS kernel.

Types of system calls:

| Type | Examples |
|---|---|
| Process control | `fork`, `exec`, `wait`, `exit` |
| File management | `open`, `read`, `write`, `close` |
| Device management | request/release device |
| Information maintenance | get/set time, process info |
| Communication | pipes, shared memory, sockets |
| Protection | permissions, access control |

### OS Structures

| Structure | Meaning | Advantage | Disadvantage |
|---|---|---|---|
| Simple | small OS with weak separation | fast, easy | poor protection |
| Monolithic | all services in kernel space | fast communication | one bug can crash system |
| Layered | OS divided into layers | modular, easy debugging | overhead, hard layer design |
| Microkernel | minimal kernel; services in user space | reliable, secure | slower due to message passing |
| Modular | kernel with loadable modules | flexible | module bugs can affect kernel |
| Hybrid | mix of monolithic and microkernel ideas | balances speed and modularity | complex design |
| Virtual machine | hardware abstraction for multiple OSs | isolation | overhead |

MCQ traps:

- Microkernel keeps only essential services in kernel mode.
- Monolithic is fast because services communicate inside one kernel.
- Layered design is easier to debug, but can add overhead.

## 5. Linux OS

### Linux Basics

Linux is a free and open-source Unix-like operating system kernel created by Linus Torvalds in 1991.

GNU tools plus the Linux kernel form a complete GNU/Linux OS.

### Linux Features

- Open source
- Multiuser
- Multitasking
- Secure permission model
- Stable and reliable
- Portable
- Strong command-line support
- Everything is treated as a file

### Linux Philosophy

- Do one thing and do it well.
- Everything is a file.
- Prefer text streams and command-line tools.
- Automate using shell scripts.

### Linux Distributions

Examples:

- Ubuntu
- Debian
- Fedora
- Red Hat Enterprise Linux
- CentOS
- Kali Linux

### Linux Architecture

```text
User applications
Shell / GUI
System libraries
Kernel
Hardware
```

MCQ traps:

- Linux itself is technically a kernel.
- Ubuntu, Fedora, Debian, Kali are distributions.
- Android is based on the Linux kernel.
- Shell is not the kernel.

## 6. Process Management

### Program vs Process

| Program | Process |
|---|---|
| Passive entity stored on disk | Active entity in execution |
| Contains code/instructions | Has PC, registers, stack, heap, data |
| No execution state | Has process state |

### Process Memory Layout

```text
Text section: program code
Data section: global variables
Heap: dynamic memory allocation
Stack: function calls, local variables, return addresses
```

### Process States

| State | Meaning |
|---|---|
| New | process is being created |
| Ready | waiting for CPU |
| Running | instructions are executing |
| Waiting/Blocked | waiting for I/O or event |
| Terminated | finished execution |

Common transitions:

```text
New -> Ready
Ready -> Running
Running -> Waiting
Waiting -> Ready
Running -> Ready
Running -> Terminated
```

### Process Control Block (PCB)

PCB stores all information about a process:

- Process state
- Program counter
- CPU registers
- CPU scheduling information
- Memory-management information
- Accounting information
- I/O status information

MCQ trap: During context switching, the old process state is saved in its PCB and the new process state is loaded from its PCB.

### Context Switch

A context switch happens when CPU switches from one process to another.

It is pure overhead because the system does no useful user work during the switch.

### Process Operations

Process creation:

- Parent creates child.
- In Linux/Unix, `fork()` creates a new process.
- `exec()` replaces process memory with a new program.
- `wait()` makes parent wait for child.

Process termination:

- Normal exit.
- Error exit.
- Killed by another process.
- Parent may terminate child.

### Interprocess Communication (IPC)

Two main IPC models:

| Model | Meaning | MCQ clue |
|---|---|---|
| Shared memory | processes share a memory region | faster after setup |
| Message passing | processes exchange messages | useful in distributed systems |

MCQ traps:

- Shared memory is usually faster than message passing.
- Message passing avoids explicit shared memory synchronization but has communication overhead.

## 7. Threads

### Thread Definition

A thread is the smallest unit of CPU execution inside a process. Threads are also called lightweight processes.

Each thread has:

- Thread ID
- Program counter
- Register set
- Stack

Threads in the same process share:

- Code section
- Data section
- Heap
- Open files
- Other process resources

### Benefits of Threads

- Responsiveness
- Resource sharing
- Economy
- Scalability on multicore systems

### Single Thread vs Multithread

| Single-threaded | Multithreaded |
|---|---|
| one task at a time | multiple tasks in same process |
| simple | better responsiveness |
| blocking affects full process | one thread can continue while another waits |

### User Threads vs Kernel Threads

| User-level threads | Kernel-level threads |
|---|---|
| managed by user library | managed by OS kernel |
| fast creation/switching | true parallelism possible |
| one blocking call may block all | more overhead |

### Multithreading Models

| Model | Meaning | Key point |
|---|---|---|
| Many-to-one | many user threads mapped to one kernel thread | no true parallelism |
| One-to-one | each user thread maps to one kernel thread | better concurrency, more overhead |
| Many-to-many | many user threads multiplexed over many kernel threads | flexible |

### Threading Issues

- `fork()` and `exec()` behavior
- Signal handling
- Thread cancellation
- Thread-local storage
- Scheduler activations

MCQ traps:

- Process is heavyweight; thread is lightweight.
- Threads share process resources but have separate stack and registers.
- Multicore programming gives true parallel execution.

## 8. CPU Scheduling

### Why Scheduling Is Needed

In a single-processor system, only one process can run at a time. CPU scheduling decides which ready process gets the CPU next.

### CPU-I/O Burst Cycle

Process execution alternates between:

```text
CPU burst -> I/O burst -> CPU burst -> I/O burst ...
```

### When Scheduling Occurs

Scheduling decisions happen when:

- Running process moves to waiting state.
- Running process moves to ready state due to interrupt.
- Waiting process moves to ready state after I/O completion.
- Process terminates.

### Preemptive vs Non-Preemptive

| Type | Meaning |
|---|---|
| Non-preemptive | running process keeps CPU until it blocks or terminates |
| Preemptive | OS can take CPU away from a running process |

MCQ clue:

- FCFS is non-preemptive.
- SJF can be preemptive or non-preemptive.
- SRTF is preemptive SJF.
- Round Robin is preemptive.

### FCFS / FIFO Scheduling

First process arriving gets CPU first.

Advantages:

- Simple
- Fair by arrival order
- No starvation

Disadvantages:

- Convoy effect
- Poor average waiting time when long process comes first

### SJF Scheduling

Shortest Job First selects the process with smallest CPU burst.

Advantages:

- Minimum average waiting time if burst times are known.

Disadvantages:

- Hard to know next CPU burst exactly.
- Long processes may starve.

### SRTF Scheduling

Shortest Remaining Time First is preemptive SJF.

If a new process arrives with shorter remaining time than the current process, CPU is preempted.

### Priority Scheduling

CPU is allocated to highest-priority process.

Important:

- Smaller number often means higher priority in textbook convention.
- Some examples use larger number as higher priority, so read question carefully.
- SJF is a priority algorithm where priority is predicted next CPU burst.

Problem:

- Starvation of low-priority processes.

Solution:

- Aging: gradually increase priority of waiting processes.

### Round Robin Scheduling

Each process gets CPU for a fixed time quantum `q`.

If process does not finish in `q`, it is preempted and placed at the end of ready queue.

Important:

- If `q` is very large, RR behaves like FCFS.
- If `q` is very small, context-switch overhead increases.
- No starvation because each process gets a turn.
- Maximum wait before next turn is about `(n - 1) * q`.

### Multilevel Queue Scheduling

Ready queue is divided into separate queues, such as:

- Foreground/interactive
- Background/batch
- System processes

Processes are permanently assigned to one queue.

Each queue can have its own scheduling algorithm.

### Multilevel Feedback Queue Scheduling

Processes can move between queues.

Used to separate CPU-bound and I/O-bound processes dynamically.

MCQ traps:

- MLQ: fixed queue assignment.
- MLFQ: processes can move between queues.
- Aging can be implemented by moving waiting processes to higher-priority queues.

## 9. Process Synchronization

### Race Condition

A race condition occurs when multiple processes access shared data concurrently and final result depends on execution order.

### Critical Section

Critical section is the part of code where shared data/resources are accessed.

### Conditions for Correct Critical-Section Solution

| Condition | Meaning |
|---|---|
| Mutual exclusion | only one process in critical section |
| Progress | decision cannot be postponed indefinitely |
| Bounded waiting | limit exists on how long a process waits |

MCQ trap:

- Mutual exclusion prevents simultaneous entry.
- Progress prevents deadlock-like indefinite decision delay.
- Bounded waiting prevents starvation.

### Peterson's Solution

Used for two processes.

Shared variables:

```c
boolean flag[2];
int turn;
```

Idea:

- `flag[i] = true` means process `i` wants to enter.
- `turn = j` gives other process a chance.
- Works for mutual exclusion, progress, and bounded waiting.

### Synchronization Hardware

Atomic hardware instructions:

| Instruction | Meaning |
|---|---|
| TestAndSet | reads old value and sets value atomically |
| CompareAndSwap | swaps only if current value equals expected value |

Spinlock:

- Process waits in a loop until lock becomes available.
- Wastes CPU cycles.
- Useful when wait time is very short and context-switch cost is high.

### Mutex

A mutex lock provides mutual exclusion.

Typical operations:

```text
acquire()
release()
```

### Semaphore

A semaphore is an integer variable accessed only through atomic operations:

```text
wait(S) / P(S)
signal(S) / V(S)
```

Types:

| Type | Meaning |
|---|---|
| Binary semaphore | value 0 or 1; like mutex |
| Counting semaphore | value can be more than 1; counts multiple resource instances |

Busy-wait version:

```c
wait(S) {
    while (S <= 0);
    S--;
}

signal(S) {
    S++;
}
```

Blocking semaphore avoids busy waiting by putting process into a waiting queue.

### Producer-Consumer / Bounded Buffer

Initial semaphores:

```text
mutex = 1
empty = n
full = 0
```

Producer order:

```text
wait(empty)
wait(mutex)
add item
signal(mutex)
signal(full)
```

Consumer order:

```text
wait(full)
wait(mutex)
remove item
signal(mutex)
signal(empty)
```

MCQ trap: Reversing `empty/full` is a common wrong option.

### Readers-Writers

- Multiple readers can read together.
- Writer needs exclusive access.
- First reader locks writers out.
- Last reader releases writer lock.

### Dining Philosophers

Problem shows synchronization and deadlock.

Simple solution can deadlock if every philosopher picks one chopstick and waits for the other.

## 10. Deadlock

### Definition

Deadlock occurs when a set of processes are permanently blocked because each process is waiting for a resource/event held by another process in the set.

### Four Necessary Conditions

All four must hold together:

| Condition | Meaning |
|---|---|
| Mutual exclusion | at least one non-sharable resource |
| Hold and wait | process holds one resource and waits for another |
| No preemption | resource cannot be forcibly taken |
| Circular wait | circular chain of waiting processes |

MCQ trap: Breaking any one condition can prevent deadlock.

### Resource Allocation Graph (RAG)

Symbols:

- Process: circle
- Resource type: rectangle
- Request edge: process -> resource
- Assignment edge: resource -> process

Important:

- If graph has no cycle: no deadlock.
- If graph has cycle and each resource type has one instance: deadlock exists.
- If graph has cycle and resource types have multiple instances: deadlock may or may not exist.

### Deadlock Handling Methods

| Method | Meaning |
|---|---|
| Prevention | make sure at least one necessary condition cannot hold |
| Avoidance | use future resource info to avoid unsafe states |
| Detection and recovery | allow deadlock, detect, then recover |
| Ignorance | ignore because deadlocks are rare; used by many general OSs |

### Deadlock Prevention

| Condition broken | Method |
|---|---|
| Mutual exclusion | make resource sharable if possible |
| Hold and wait | request all resources at once, or request only when holding none |
| No preemption | preempt resources if request cannot be granted |
| Circular wait | impose total ordering of resource types |

Disadvantages:

- Low resource utilization
- Possible starvation

### Deadlock Avoidance

Requires prior knowledge of maximum resource needs.

Safe state:

- There exists a safe sequence in which all processes can finish.

Unsafe state:

- Not necessarily deadlocked, but may lead to deadlock.

### Banker's Algorithm

Data structures:

| Matrix/Vector | Meaning |
|---|---|
| Available | available instances of each resource |
| Max | maximum demand of each process |
| Allocation | resources currently allocated |
| Need | remaining need |

Formula:

```text
Need = Max - Allocation
```

Safety test idea:

1. Set `Work = Available`.
2. Find process with `Finish = false` and `Need <= Work`.
3. Pretend it finishes: `Work = Work + Allocation`.
4. Repeat.
5. If all finish, state is safe.

### Deadlock Detection

Single instance resources:

- Use wait-for graph.
- Cycle means deadlock.

Multiple instance resources:

- Use detection algorithm similar to Banker's safety algorithm.

### Recovery from Deadlock

Methods:

- Abort all deadlocked processes.
- Abort one process at a time until cycle breaks.
- Preempt resources and roll back processes.

Victim selection factors:

- Process priority
- Work completed
- Remaining work
- Resources held
- Resources needed
- Number of processes to terminate

MCQ trap:

- If resources are preempted, process may need rollback.

## 11. Memory Management and Virtualisation

### Logical vs Physical Address

| Address | Meaning |
|---|---|
| Logical address | generated by CPU; also called virtual address |
| Physical address | actual address seen by memory unit |

### Address Binding

| Binding time | Meaning |
|---|---|
| Compile time | absolute address known in advance |
| Load time | address decided when program is loaded |
| Execution time | address translation happens during execution; needs MMU |

### Memory Management Unit (MMU)

MMU maps logical/virtual addresses to physical addresses.

With base and limit registers:

```text
if logical_address < limit:
    physical_address = base + logical_address
else:
    trap
```

### Swapping

Swapping temporarily moves a process from main memory to backing store and later brings it back.

Roll out, roll in:

- Lower-priority process swapped out.
- Higher-priority process loaded.

### Contiguous Memory Allocation

Each process gets one continuous block of memory.

Allocation strategies:

| Strategy | Meaning | MCQ clue |
|---|---|---|
| First fit | first hole big enough | usually fastest |
| Best fit | smallest hole big enough | leaves smallest leftover |
| Worst fit | largest hole | leaves largest leftover |

### Fragmentation

| Type | Meaning | Common in |
|---|---|---|
| Internal fragmentation | allocated block is larger than requested | fixed partitions, paging |
| External fragmentation | enough total memory exists but not contiguous | variable partitions, segmentation |

Compaction:

- Combines scattered holes into one large hole.
- Possible only if relocation is dynamic.

### Paging

Paging allows non-contiguous physical allocation.

Terms:

| Term | Meaning |
|---|---|
| Page | fixed-size block of logical memory |
| Frame | fixed-size block of physical memory |
| Page table | maps pages to frames |
| Offset | position within page/frame |

Paging:

- Eliminates external fragmentation.
- Can cause internal fragmentation.

Logical address:

```text
page number + offset
```

Physical address:

```text
frame number + offset
```

### TLB

Translation Lookaside Buffer is a fast cache for page-table entries.

| Event | Meaning |
|---|---|
| TLB hit | page number found in TLB |
| TLB miss | page table must be checked in memory |
| Hit ratio | percentage of references found in TLB |

### Segmentation

Segmentation supports user's view of memory.

Segments may include:

- Main program
- Functions
- Stack
- Symbol table
- Arrays

Logical address:

```text
segment number + offset
```

Segment table entry:

```text
base + limit
```

If `offset >= limit`, trap occurs.

### Segmentation With Paging

Combines both methods:

- Segmentation gives logical program view.
- Paging removes external fragmentation.

## 12. Virtual Memory

### Virtual Memory Definition

Virtual memory separates logical memory from physical memory, allowing programs larger than physical memory to execute.

Benefits:

- Larger programs can run.
- More processes can be in memory.
- Less I/O required initially.
- Better CPU utilization.

### Demand Paging

Demand paging loads a page into memory only when it is needed.

Valid-invalid bit:

| Bit | Meaning |
|---|---|
| valid | page is in memory |
| invalid | page is not in memory or invalid reference |

### Page Fault Handling

Steps:

1. Trap to OS.
2. Check if reference is valid.
3. If invalid, abort process.
4. If valid but missing, find free frame.
5. Read page from disk into frame.
6. Update page table and valid bit.
7. Restart interrupted instruction.

### Page Replacement

Needed when no free frame is available.

Goal:

- Minimize page fault rate.

Algorithms:

| Algorithm | Replacement rule | MCQ clue |
|---|---|---|
| FIFO | oldest loaded page | can suffer Belady's anomaly |
| Optimal | page not used for longest time in future | best but not practically implementable |
| LRU | page not used for longest time in past | good approximation of OPT |

Belady's anomaly:

- Increasing number of frames can increase page faults.
- Occurs in FIFO.
- Does not occur in Optimal or LRU.

### Frame Allocation

| Method | Meaning |
|---|---|
| Equal allocation | every process gets same number of frames |
| Proportional allocation | frames based on process size |
| Global replacement | process can take frame from another process |
| Local replacement | process replaces only from its own frames |

### Thrashing

Thrashing occurs when a process spends more time paging than executing.

Cause:

- Too few frames for active working set.

Symptoms:

- High page fault rate.
- Low CPU utilization.
- Excessive disk I/O.

Working-set model:

- Based on locality of reference.
- Working set = pages used in recent fixed-size window.
- If total demand exceeds frames, suspend a process.

MCQ traps:

- Demand paging loads pages only when needed.
- Page replacement is needed only if no free frame is available.
- Optimal looks into future; LRU looks into past.

## 13. Mass Storage Structure

### Disk Basics

| Term | Meaning |
|---|---|
| Track/cylinder | numbered disk location |
| Disk head | reads/writes data |
| Seek time | time to move head to correct track |
| Rotational latency | time for sector to rotate under head |
| Transfer time | time to actually transfer data |

Disk scheduling mainly tries to reduce seek time/head movement.

### Disk Scheduling Algorithms

| Algorithm | Rule | Starvation? |
|---|---|---|
| FCFS | serve in arrival order | no |
| SSTF | serve nearest request next | possible |
| SCAN | move to disk end, reverse | low |
| C-SCAN | move one direction, jump to start | low |
| LOOK | like SCAN but stops at last request | low |
| C-LOOK | like C-SCAN but jumps between last and first request | low |

Key differences:

- SCAN goes to physical end of disk.
- LOOK goes only to last request in that direction.
- C-SCAN goes to one end, jumps to other end.
- C-LOOK jumps from last request to first request without going to physical end.

MCQ traps:

- SSTF can starve far requests.
- FCFS is fair but can cause large head movement.
- SCAN is called elevator algorithm.

## 14. File Management System

### File Attributes

Common file attributes:

- Name
- Identifier
- Type
- Location
- Size
- Protection
- Time/date/user identification

### File Access Methods

| Method | Meaning |
|---|---|
| Sequential access | process data in order |
| Direct/random access | jump to any block |
| Indexed access | use index to locate blocks |

### File Allocation Methods

| Method | Meaning | Advantage | Disadvantage |
|---|---|---|---|
| Contiguous allocation | file occupies consecutive blocks | fast sequential/direct access | external fragmentation |
| Linked allocation | each block points to next | no external fragmentation | slow direct access, pointer overhead |
| Indexed allocation | index block stores all block pointers | supports direct access | index block overhead |

### Free-Space Management

| Method | Meaning |
|---|---|
| Bit vector/bitmap | one bit per block; 1/0 shows free/used |
| Linked list | free blocks linked together |
| Grouping | first free block stores addresses of more free blocks |
| Counting | store start block and count of contiguous free blocks |

MCQ traps:

- Contiguous allocation has external fragmentation.
- Linked allocation is poor for random/direct access.
- Indexed allocation needs extra index block.

## 15. Linux Lab Commands for Direct MCQs

### Navigation and Files

| Command | Use |
|---|---|
| `ls` | list files |
| `cd` | change directory |
| `pwd` | print current directory |
| `mkdir` | create directory |
| `rmdir` | remove empty directory |
| `cp` | copy |
| `mv` | move/rename |
| `rm` | remove |
| `cat` | display file |
| `less` | view file page by page |
| `whereis` | locate binary/source/manual |
| `whatis` | one-line manual description |

### User and System Status

| Command | Use |
|---|---|
| `su` | switch user |
| `sudo` | run command as superuser/another user |
| `man` | manual pages |
| `help` | shell built-in help |
| `history` | command history |
| `who` | logged-in users |
| `whoami` | current username |
| `id` | user/group IDs |
| `uname` | system/kernel info |
| `uptime` | how long system has been running |
| `free` | memory usage |
| `tty` | terminal name |
| `cal` | calendar |
| `date` | date/time |
| `hostname` | system host name |
| `reboot` | restart system |
| `clear` | clear terminal screen |

### File Comparison and File System

| Command | Use |
|---|---|
| `diff` | line-by-line differences |
| `cmp` | byte-by-byte comparison |
| `comm` | compare sorted files line by line |
| `chmod` | change permissions |
| `chown` | change ownership |
| `ln` | create links |
| `mount` | attach filesystem |
| `df` | disk free space |
| `du` | disk usage |

### Linux System Calls

| System call | Use |
|---|---|
| `fork()` | create child process |
| `exec()` | replace process image with new program |
| `wait()` | parent waits for child |
| `open()` | open file |
| `read()` | read from file |
| `write()` | write to file |
| `close()` | close file |
| `lseek()` | move file pointer |
| `stat()` | get file information |

## 16. Common MCQ Traps

1. Safe state does not mean deadlock; it means deadlock can be avoided.
2. Unsafe state does not always mean deadlock; it may lead to deadlock.
3. In RAG, cycle means definite deadlock only when every resource type has one instance.
4. `Need = Max - Allocation`, not `Available - Allocation`.
5. Paging removes external fragmentation but can cause internal fragmentation.
6. Segmentation matches user's program view but can cause external fragmentation.
7. FIFO page replacement can show Belady's anomaly.
8. Round Robin with very large quantum behaves like FCFS.
9. Aging solves starvation in priority scheduling.
10. Context switching is overhead.
11. Shared memory IPC is usually faster than message passing after setup.
12. Threads share code/data/heap but not stack/registers.
13. Kernel is core OS; shell is command interface.
14. Linux is the kernel; Ubuntu/Debian/Fedora are distributions.
15. SCAN goes to disk end; LOOK stops at last request.

## 17. Mini MCQ Drill

Answers are at the end of this section.

1. Which OS component maps logical addresses to physical addresses?
   A. Compiler
   B. Loader
   C. MMU
   D. Shell

2. Which scheduling algorithm may suffer from convoy effect?
   A. FCFS
   B. Round Robin
   C. Priority with aging
   D. Multilevel feedback queue

3. In Banker's algorithm, Need is equal to:
   A. Allocation - Max
   B. Max - Allocation
   C. Available - Allocation
   D. Max - Available

4. Which page replacement algorithm is not practically implementable exactly?
   A. FIFO
   B. LRU
   C. Optimal
   D. Second chance

5. Which critical-section condition prevents starvation?
   A. Mutual exclusion
   B. Progress
   C. Bounded waiting
   D. No preemption

6. Which algorithm is also called the elevator algorithm?
   A. SSTF
   B. SCAN
   C. C-LOOK
   D. FCFS

7. Which command shows current logged-in username?
   A. `who`
   B. `id`
   C. `whoami`
   D. `uname`

8. Which file allocation method suffers from external fragmentation?
   A. Linked
   B. Indexed
   C. Contiguous
   D. Grouping

9. A thread has its own:
   A. heap
   B. data section
   C. stack
   D. code section

10. In paging, the logical memory block is called:
    A. frame
    B. page
    C. segment
    D. cylinder

Answer key:

```text
1-C, 2-A, 3-B, 4-C, 5-C, 6-B, 7-C, 8-C, 9-C, 10-B
```

## 18. Last-Day Revision Order

If you have only 2 hours:

1. Virtual memory and page replacement.
2. Memory management and paging/segmentation.
3. Deadlock and Banker's algorithm.
4. Process synchronization and semaphores.
5. CPU scheduling formulas and algorithms.
6. Disk scheduling differences.
7. Linux commands and file allocation.
8. Intro/OS structure/process/thread definitions.

If you have only 30 minutes:

1. Formula sheet.
2. Common MCQ traps.
3. Deadlock conditions and Banker's formula.
4. Paging vs segmentation vs virtual memory.
5. Scheduling algorithm comparison.
