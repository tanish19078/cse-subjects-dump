# Unit 1: OS and Linux Foundations

Lectures covered: 1-6  
Syllabus weightage: 18%  
Galvin alignment: Introduction to operating systems and operating-system structures.

## 1. Unit Target

By the end of this unit, you should be able to answer:

- What is an operating system?
- Why is an OS needed?
- What are the major components of an OS?
- What are user mode, kernel mode, interrupts, system calls, and system programs?
- How are OS structures different?
- What is Linux, and how is Linux architecture organized?

## Official Lecture Breakdown

| Lectures | Official handout topic | Covered below |
|---:|---|---|
| 1-2 | Introduction to OS, OS role, single processor, multiprocessor systems, clustered systems, OS operations, OS components: process, memory, storage, I/O management | sections 3-8 |
| 3-4 | Monolithic, layered, microkernel, kernel, shell, OS services and system calls, user and OS interface, System Calls/API, types of system calls, system programs | sections 9-11 and 14-15 |
| 5-6 | Linux history, philosophy, distributions, Linux architecture overview | sections 12-13 |

## 2. Mental Model

Think of a computer system in layers:

```text
User
Application programs
System programs / shell
Operating system kernel
Hardware
```

The OS sits between programs and hardware. It hides hardware complexity and controls resource sharing.

In Galvin-style language, the OS has two broad roles:

- Resource allocator: manages CPU, memory, I/O devices, and files.
- Control program: controls execution of programs to prevent errors and improper use.

## 3. What Is an Operating System?

An operating system is system software that:

- Provides an environment for program execution.
- Acts as an intermediary between users/applications and hardware.
- Manages resources like CPU, memory, storage, and I/O devices.
- Provides services such as file management, process management, security, and communication.

Common MCQ statement:

```text
The one program running at all times on the computer is called the kernel.
```

Important:

- OS is not the same as a user interface.
- Kernel is the core part of OS.
- Shell/GUI is only an interface to interact with OS.

## 4. Goals of an OS

| Goal | Meaning |
|---|---|
| Convenience | Make computer easier to use |
| Efficiency | Use hardware resources effectively |
| Resource sharing | Allow many programs/users to share CPU, memory, I/O |
| Protection | Stop one process/user from harming another |
| Abstraction | Hide low-level hardware details |

MCQ trap:

- A desktop OS prioritizes convenience.
- A server OS may prioritize efficiency, security, and throughput.
- A real-time OS prioritizes timing guarantees.

## 5. Computer System Architecture

### Single-Processor System

One main general-purpose CPU executes instructions.

MCQ clue:

- Simpler design.
- Only one process can run at an exact instant, although multiprogramming gives illusion of concurrency.

### Multiprocessor System

Two or more processors share memory, bus, clock, and I/O.

Advantages:

- Higher throughput.
- Economy of scale.
- Increased reliability.

Types:

| Type | Meaning |
|---|---|
| Asymmetric multiprocessing | one boss processor controls others |
| Symmetric multiprocessing | all processors are peers |

GATE trap:

- More processors do not mean perfectly proportional speedup because of synchronization and memory contention.

### Clustered System

Multiple independent computers connected by a network and often sharing storage.

Used for:

- High availability.
- Load balancing.
- Parallel processing.

MCQ clue:

- Clustered systems are loosely coupled.
- Multiprocessor systems are tightly coupled.

## 6. OS Operations

### Interrupts

An interrupt is a signal that tells the CPU an event needs attention.

Types:

| Type | Source | Example |
|---|---|---|
| Hardware interrupt | hardware device | keyboard input, disk completion |
| Software interrupt / trap | running program | system call, divide by zero |

Flow:

```text
Interrupt occurs -> CPU stops current work -> OS interrupt handler runs -> previous execution resumes
```

MCQ trap:

- Trap is a software-generated interrupt.
- System call is usually implemented through a trap.

### Dual-Mode Operation

Modern OS uses at least two modes:

| Mode | Meaning |
|---|---|
| User mode | limited privileges; application programs run here |
| Kernel mode | full privileges; OS kernel runs here |

Mode bit:

- `0` may represent kernel mode.
- `1` may represent user mode.
- Exact value depends on convention; concept matters more.

Privileged instructions:

- Can run only in kernel mode.
- Examples: direct I/O, changing memory protection, halting CPU, setting timer.

Why needed:

- Prevent user programs from directly controlling hardware.
- Protect OS and other programs.

### Timer

A timer interrupts the CPU after a fixed period.

Purpose:

- Prevents a user program from running forever.
- Helps implement CPU scheduling and time sharing.

## 7. OS Components

| Component | Responsibilities |
|---|---|
| Process management | create, delete, suspend, resume, schedule processes |
| Memory management | allocate/deallocate memory, track memory usage |
| File-system management | create/delete/read/write files and directories |
| I/O system management | buffering, caching, spooling, device drivers |
| Secondary-storage management | free-space management, disk scheduling |
| Protection and security | access control, authentication |
| Networking | communication between systems |
| Command interpreter | accepts and executes user commands |

Trick:

- If the question says "which component tracks main memory usage?", answer memory management.
- If it says "decides which process gets CPU?", answer CPU scheduling/process management.
- If it says "manages disk free blocks?", answer storage or file-system implementation depending on options.

## 8. OS Services

Services useful to users:

- User interface.
- Program execution.
- I/O operations.
- File-system manipulation.
- Communication.
- Error detection.

Services useful to system efficiency:

- Resource allocation.
- Accounting.
- Protection and security.

MCQ trap:

- Error detection is an OS service.
- Accounting means tracking resource usage, not only money.

## 9. System Calls

A system call is the interface through which a user program requests a service from the kernel.

Typical path:

```text
User program -> library/API -> system call -> trap to kernel -> service runs -> return to user mode
```

### API vs System Call

| API | System call |
|---|---|
| Function interface used by programmer | Actual request to OS kernel |
| Example: C library wrapper | Example: `read`, `write`, `fork` |
| Portable at source level | OS-specific |

### Types of System Calls

| Type | Examples |
|---|---|
| Process control | `fork`, `exec`, `wait`, `exit` |
| File management | `open`, `read`, `write`, `close`, `lseek` |
| Device management | request/release device, read/write device |
| Information maintenance | time, date, process attributes |
| Communication | pipes, shared memory, sockets |
| Protection | permissions, access control |

GATE trick:

- If options include `fork`, `exec`, `wait`, they are process-control calls.
- If options include `open`, `read`, `write`, `close`, they are file calls.

### User and OS Interface

Users interact with the OS through interfaces such as:

| Interface | Meaning |
|---|---|
| Command-line interface | user types commands into a shell |
| Graphical user interface | user interacts through windows, icons, menus, pointer |
| Touch interface | user interacts using touch gestures |
| System-call interface | programs request OS services through APIs/system calls |

Important:

- User interface is for human interaction.
- System-call interface is for program-to-kernel interaction.

## 10. System Programs

System programs provide a convenient environment for program development and execution.

Examples:

- File management utilities.
- Status information tools.
- Text editors.
- Compilers, assemblers, loaders.
- Communication programs.
- Shells.

System programs are not the kernel. They use OS services.

## 11. OS Structures

### Simple Structure

Small OS with weak separation between modules.

Example idea: MS-DOS style.

Advantages:

- Fast.
- Easy to build initially.

Disadvantages:

- Poor modularity.
- Poor protection.
- One bug can affect whole system.

### Monolithic Structure

Entire OS runs as one large kernel-mode program.

Advantages:

- Fast service communication.
- Efficient because components call each other directly.

Disadvantages:

- Large kernel.
- Harder debugging.
- Kernel bug may crash whole OS.

MCQ clue:

- "All services in kernel space" means monolithic.

### Layered Structure

OS is divided into layers. Each layer uses only lower layers.

Advantages:

- Easier debugging.
- Clear modularity.

Disadvantages:

- Difficult to define layers.
- Extra overhead when requests pass through layers.

### Microkernel

Only minimal services stay in kernel:

- Low-level address-space management.
- Thread/process communication.
- Basic scheduling.

Other services run in user space:

- File system.
- Device drivers.
- Network services.

Advantages:

- Better reliability.
- Better security.
- Easier extension.

Disadvantages:

- More overhead due to message passing.

GATE trap:

- Microkernel is not necessarily faster. It is often more reliable but can be slower.

### Modular Kernel

Core kernel with dynamically loadable modules.

Example idea:

- Load device driver when needed.

Advantages:

- Flexible.
- Easier extension.
- Better than pure monolithic in maintainability.

### Hybrid Kernel

Combines features of monolithic and microkernel.

Used in many practical OS designs.

### Virtual Machines

A virtual machine provides an abstraction of hardware so multiple OSs can run on one physical machine.

Terms:

| Term | Meaning |
|---|---|
| Host | physical machine/OS |
| Guest | OS running inside VM |
| Hypervisor/VMM | layer that manages VMs |

Advantages:

- Isolation.
- Testing.
- Server consolidation.

Disadvantages:

- Overhead.
- Resource management complexity.

## 12. Linux Fundamentals

### What Is Linux?

Linux is a free and open-source Unix-like kernel created by Linus Torvalds in 1991.

GNU tools plus Linux kernel form a complete GNU/Linux operating system.

Common distributions:

- Ubuntu
- Debian
- Fedora
- Red Hat Enterprise Linux
- CentOS
- Kali Linux

MCQ trap:

- Linux is technically the kernel.
- Ubuntu is a distribution.
- Android uses the Linux kernel.

### Linux Features

- Open source.
- Multiuser.
- Multitasking.
- Strong file permissions.
- Stable and reliable.
- Portable.
- Powerful command line.
- Good networking support.

### Linux Philosophy

Important lines for MCQs:

- Do one thing and do it well.
- Everything is treated as a file.
- Store data in plain text where possible.
- Combine small tools using shell and pipes.

### Linux Architecture

```text
Applications
Shell / GUI
System libraries
System call interface
Kernel
Hardware
```

Kernel handles:

- Process management.
- Memory management.
- File systems.
- Device drivers.
- Networking.

Shell handles:

- Command interpretation.
- Script execution.
- User interaction.

## 13. Linux Basic Commands

| Command | Purpose |
|---|---|
| `ls` | list files |
| `cd` | change directory |
| `pwd` | show current directory |
| `mkdir` | create directory |
| `rmdir` | remove empty directory |
| `cp` | copy |
| `mv` | move/rename |
| `rm` | remove |
| `cat` | display file |
| `less` | page-wise file viewing |
| `whereis` | locate binary/source/manual |
| `whatis` | one-line command description |
| `man` | manual page |
| `history` | command history |
| `who` | logged-in users |
| `whoami` | current username |
| `id` | user and group IDs |
| `uname` | system information |
| `uptime` | running time |
| `free` | memory usage |
| `date` | date/time |
| `cal` | calendar |

Command tricks:

- `whoami` answers "which user am I?"
- `who` answers "who is logged in?"
- `pwd` answers "where am I?"
- `ls` answers "what is here?"
- `cd` changes location but does not print files.

## 14. High-Yield Differences

### Kernel vs Shell

| Kernel | Shell |
|---|---|
| Core OS | User interface |
| Talks to hardware | Talks to user |
| Runs in kernel mode | Usually runs in user mode |
| Manages resources | Interprets commands |

### Interrupt vs Trap

| Interrupt | Trap |
|---|---|
| Usually hardware-generated | Software-generated |
| Example: I/O completion | Example: system call, divide by zero |
| Asynchronous | Often synchronous |

### Multiprocessor vs Clustered

| Multiprocessor | Clustered |
|---|---|
| tightly coupled | loosely coupled |
| shared memory | usually separate memory |
| multiple CPUs in one system | multiple systems connected |

## 15. GATE-Level Angles

### Angle 1: Mode Bit

Question pattern:

```text
Why do systems use dual-mode operation?
```

Answer idea:

- To protect OS and hardware from user programs.

### Angle 2: System Call Flow

Question pattern:

```text
What happens when a user program invokes read()?
```

Answer idea:

- Library/API call triggers system call.
- Trap switches CPU to kernel mode.
- Kernel performs service.
- Control returns to user mode.

### Angle 3: OS Structure Trade-Off

Question pattern:

```text
Which OS structure has better reliability but message-passing overhead?
```

Answer:

- Microkernel.

## 16. Quick Revision Box

- OS = resource allocator + control program.
- Kernel = core OS running at all times.
- Shell = command interpreter.
- System call = program-to-kernel interface.
- Trap = software interrupt.
- Dual mode protects system.
- Timer prevents infinite CPU capture.
- Monolithic = fast but less modular.
- Microkernel = reliable but message-passing overhead.
- Linux = kernel; Ubuntu/Debian/Fedora = distributions.

## 17. Practice Prompts

1. Explain why system calls are needed.
2. Compare monolithic and microkernel structures.
3. Differentiate interrupt and trap.
4. Write the layered architecture of Linux.
5. Explain why user programs cannot execute privileged instructions directly.
